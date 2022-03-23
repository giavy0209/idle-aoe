import { IBattleRound, IMarching } from "interfaces";
import { BattleActions, BattleRounds, Battles, Marchings, Resources, Units, Users } from "models";
import { Document, Schema, Types } from "mongoose";
import { changeMarching, changeResources } from "wsServices";
import { CHANGE_RESOURCE } from "./workerChangeResource";
import { CHANGE_UNIT } from "./workerChangeUnit";


const buildingAttackOrder = [
    '623828c68a78fd802e9a6ebf',
    '623828c68a78fd802e9a6e8d',
    '623828c68a78fd802e9a6ea6',
    '623828c68a78fd802e9a6e74'
]

async function steal(marching: Document<unknown, any, IMarching> & IMarching & {
    _id: Types.ObjectId;
}) {
    const targetResource = await Resources.find({ user: marching.target })
        .populate('type')
        .sort({ value: 1 })
    let cargo = 0

    marching.units.forEach(unit => {
        cargo += unit.unit.cargo * unit.total
    })

    let cargoPerRes = 0

    targetResource.forEach((resource, index) => {
        cargoPerRes = Math.floor(cargo / (4 - index))
        const targetResourceValue = resource.value
        let resourceCanSteal = targetResourceValue > cargoPerRes ? cargoPerRes : targetResourceValue
        cargo -= resourceCanSteal
        const resourceName = resource.type.name.toLowerCase()
        marching.cargo[resourceName] = resourceCanSteal

        CHANGE_RESOURCE.push({
            resource: resource._id,
            newValue: -resourceCanSteal,
        })
    })
    marching.status = 1
    await marching.save()
}

async function findDefenderUnits(target: Types.ObjectId) {
    return await Units.aggregate([
        {
            $match: {
                user: target,
                total: { $gt: 0 }
            }
        },
        {
            $lookup: {
                from: 'unit_datas',
                localField: 'unit',
                foreignField: '_id',
                as: 'unit'
            }
        },
        {
            $unwind: {
                path: "$unit",
            }
        },
        {
            $lookup: {
                from: 'building_datas',
                localField: 'unit.building',
                foreignField: '_id',
                as: 'unit.building'
            }
        },
        {
            $unwind: {
                path: "$unit.building",
            }
        },
        {
            $group: {
                _id: "$unit.building.order",
                units: {
                    $push: {
                        unit: "$unit",
                        total: "$total"
                    }
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        },
        {
            $project: {
                order: "$_id",
                units: 1
            }
        }
    ])

}

function findAttackerUnits(marching: Document<unknown, any, IMarching> & IMarching & {
    _id: Types.ObjectId;
}) {
    const attackerUnitsWithOrder: { order: number, units: any[] }[] = [
        {
            order: 1,
            units: []
        },
        {
            order: 2,
            units: []
        },
        {
            order: 3,
            units: []
        },
        {
            order: 4,
            units: []
        }
    ]
    const attackerUnitsNotSort = marching.units
    attackerUnitsNotSort.forEach(unit => {
        const attackerUnitOrder = attackerUnitsWithOrder.find(o => o.order === unit.unit.building.order)
        if (attackerUnitOrder) {
            attackerUnitOrder.units?.push(unit)
        }
    })
    return attackerUnitsWithOrder.filter(o => o.units.length > 0)
}

const randomUnitToHit = (canHit: any[]) => {

    const filterCanHit = canHit.filter(value => {
        return value.total > 0
    })

    const randomUnit = filterCanHit[Math.round(Math.random() * (filterCanHit.length - 1))]

    return randomUnit
}

const Hit = async function (canHit: any, unit: any, total: any, round: Document<unknown, any, IBattleRound> & IBattleRound & {
    _id: Types.ObjectId;
}) {
    const randomHit = randomUnitToHit(canHit)
    console.log({ randomHit });

    if (!randomHit) return
    let { strength } = unit
    strength = {
        barrack: strength.barrack,
        archer: strength.archer,
        stable: strength.stable,
        workshop: strength.workshop
    }
    let attackStrength = 0
    const unitType = randomHit.unit.building.name.toLowerCase()
    for (const key in strength) {

        if (unitType.includes(key)) {
            attackStrength = strength[key]
        }
    }
    const totalStrength = attackStrength * total
    const totalLife = randomHit.unit.life * randomHit.total



    if (totalStrength < totalLife) {
        console.log({ totalStrength, totalLife }, totalStrength < totalLife , '< true');
        const unitDead = Math.ceil(totalStrength / randomHit.unit.life)
        randomHit.dead = unitDead
        
        const battleActions = await BattleActions.create({
            type: 1,
            battleRound: round._id,
            unitAttack: {
                unit: unit._id,
                total: Number(total),
                damage: Number(totalStrength),
            },
            unitDefend: {
                unit: randomHit.unit._id,
                totalHit: Number(unitDead)
            }
        })
        console.log({battleActions});

        round.actions.push(battleActions._id)
        console.log({ round }, 'push1');

    } else {
        console.log({ totalStrength, totalLife }, totalStrength < totalLife , '< false');
        randomHit.dead = randomHit.total
        const strengthLeft = totalStrength - totalLife
        const attackUnitLeft = Math.floor(strengthLeft / attackStrength)

        const battleActions = await BattleActions.create({
            battleRound: round._id,
            type: 1,
            unitAttack: {
                unit: unit._id,
                total: Number(total - attackUnitLeft),
                damage: Number(totalStrength - strengthLeft),
            },
            unitDefend: {
                unit: randomHit.unit._id,
                totalHit: Number(randomHit.total)
            }
        })
        round.actions.push(battleActions._id)
        console.log({ round }, 'push2');
        await Hit(canHit, unit, attackUnitLeft, round)
    }
}

async function unitHitByUnit(attackerUnits: any[], defenderUnitsWithOrder: any[], round: Document<unknown, any, IBattleRound> & IBattleRound & {
    _id: Types.ObjectId;
}) {

    for (let i = 0; i < attackerUnits.length; i++) {
        const { unit, total } = attackerUnits[i];

        const canHit: any[] = []

        defenderUnitsWithOrder.forEach(({ units }) => {
            units.forEach((defenderUnit: any) => {
                if (defenderUnit.unit.range <= unit.range) {
                    canHit.push(defenderUnit)
                }
            })
        })
        await Hit(canHit, unit, total, round)
    }
}

async function attack(marching: Document<unknown, any, IMarching> & IMarching & {
    _id: Types.ObjectId;
}) {

    const defenderUnitsWithOrder = await findDefenderUnits(marching.target)
    const attackerUnitsWithOrder = findAttackerUnits(marching)

    let totalRound = 1

    let round = new BattleRounds({
        name: `Round ${totalRound}`
    })

    const battle = new Battles({
        attacker: marching.user,
        defender: marching.target,
        marching: marching._id,
        rounds: []
    })
    round.battle = battle._id
    let index = 0
    while (true) {
        if (index === 0) {
            battle.rounds.push(round._id)
        }
        let defenderUnitLeft = 0
        let attackerUnitLeft = 0
        const attackerUnits = attackerUnitsWithOrder.find(o => o.order === index + 1)?.units
        const defenderUnits = defenderUnitsWithOrder.find(o => o.order === index + 1)?.units

        if (attackerUnits) {
            await unitHitByUnit(attackerUnits, defenderUnitsWithOrder, round)
        }

        if (defenderUnits) {
            await unitHitByUnit(defenderUnits, attackerUnitsWithOrder, round)
        }

        defenderUnitsWithOrder.forEach(el => {
            el.units.forEach((unit: any) => {

                if (unit.dead) {
                    unit.total -= unit.dead
                }
                defenderUnitLeft += unit.total
                unit.dead = 0
            })
        })

        attackerUnitsWithOrder.forEach(el => {
            el.units.forEach((unit: any) => {
                if (unit.dead) {
                    unit.total -= unit.dead
                }
                attackerUnitLeft += unit.total
                unit.dead = 0
            })
        })

        if (defenderUnitLeft <= 0 || attackerUnitLeft <= 0) {
            if (defenderUnitLeft <= 0) {
                marching.status = 1
                await steal(marching)
            }
            if (attackerUnitLeft <= 0) {
                marching.status = 3
            }
            console.log({ round }, 'break 1');
            await round.save()

            break
        }
        index++
        if (index === 4) {
            totalRound++
            index = 0
            console.log({ round }, 'break2');
            await round.save()
            // round = new BattleRounds({
            //     name: `Round ${totalRound}`
            // })
        }
    }

    await battle.save()
    await marching.save()

    for (let index = 0; index < defenderUnitsWithOrder.length; index++) {
        const { units } = defenderUnitsWithOrder[index];
        for (let index = 0; index < units.length; index++) {
            const unit = units[index];
            const userUnit = await Units.findOne({ user: marching.target, unit: unit.unit._id })

            if (!userUnit) continue
            CHANGE_UNIT.push({
                unit: userUnit._id,
                newValue: unit.total,
                overwrite: true,
            })
        }
    }

}

export default async function workerMarching() {
    const marchingsNotArrive = await Marchings.find({ arriveTime: { $lte: Date.now() }, status: 0 })
        .populate({
            path: "units.unit",
            populate: {
                path: "building"
            }
        })

    for (let index = 0; index < marchingsNotArrive.length; index++) {
        const marching = marchingsNotArrive[index];
        const target = await Users.findById(marching.target)
        if (!target) continue
        const targetUnit = await Units.find({ user: target._id, total: { $gt: 0 } })
        if (targetUnit.length === 0) {
            await steal(marching)
            await Battles.create({
                attacker: marching.user,
                defender: marching.target,
                marching: marching._id,
                rounds: []
            })
        } else {
            await attack(marching)
        }
        changeMarching(marching.user.toString())
    }

    const marchingNotHome = await Marchings.find({ homeTime: { $lte: Date.now() }, status: 1 })

    for (let index = 0; index < marchingNotHome.length; index++) {
        const marching = marchingNotHome[index];
        const cargo = marching.cargo
        const resources = await Resources.find({ user: marching.user })
            .populate('type')

        resources.forEach(resource => {
            const name = resource.type.name.toLowerCase()
            const resourceValue = cargo[name]
            CHANGE_RESOURCE.push({
                resource: resource._id,
                newValue: resourceValue,
            })
        })
        marching.status = 2

        const units = marching.units
        for (let index = 0; index < units.length; index++) {
            const unit = units[index];
            const userUnit = await Units.findOne({ user: marching.user, unit: unit.unit })
            if (!userUnit) continue
            CHANGE_UNIT.push({
                unit: userUnit._id,
                newValue: unit.total
            })
        }
        await marching.save()
        changeMarching(marching.user.toString())
    }
}