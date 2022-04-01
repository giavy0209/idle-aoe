import { IBattleRound, IMarching } from "interfaces";
import { BattleActions, BattleRounds, Battles, BuildingDatas, Buildings, Marchings, Markets, Resources, UnitDatas, Units, Users } from "models";
import { Document, Schema, Types } from "mongoose";
import { changeMarching, changeResources } from "wsServices";
import { waitfor, getRndInteger } from "../utils";
import { CHANGE_EXP } from "./workerChangeEXP";
import { CHANGE_RESOURCE } from "./workerChangeResource";
import { CHANGE_UNIT } from "./workerChangeUnit";
async function steal(marching: Document<unknown, any, IMarching> & IMarching & {
    _id: Types.ObjectId;
}) {
    const targetResource = await Resources.find({ user: marching.target })
        .populate('type')
        .sort({ value: 1 })

    let cargo = 0

    const shelter = await BuildingDatas.findOne({ name: 'Shelter' })
    if (shelter) {
        const targetShelter = await Buildings.findOne({ user: marching.target, building: shelter._id })

        if (targetShelter) {
            let shelterValue = targetShelter.value
            let totalResources = 0
            targetResource.forEach(({ value }) => totalResources += value)

            if (totalResources <= shelterValue) {
                targetResource.forEach(resource => {
                    resource.value = 0
                })
            } else {
                let hidePerRes = 0
                targetResource.forEach((resource, index) => {
                    hidePerRes = Math.floor(shelterValue / (4 - index))
                    const targetResourceValue = resource.value
                    const resourceCanHide = targetResourceValue > hidePerRes ? hidePerRes : targetResourceValue
                    shelterValue -= resourceCanHide
                    resource.value -= resourceCanHide
                })
            }
        }
    }

    marching.units.forEach(unit => {
        cargo += unit.unit.cargo * unit.total
    })

    let cargoPerRes = 0

    targetResource.forEach((resource, index) => {
        cargoPerRes = Math.floor(cargo / (4 - index))
        const targetResourceValue = resource.value
        const resourceCanSteal = targetResourceValue > cargoPerRes ? cargoPerRes : targetResourceValue
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
        if (!value.dead && value.total > 0) return true
        return (value.total > 0 && value.dead < value.total)
    })

    const randomUnit = filterCanHit[Math.round(Math.random() * (filterCanHit.length - 1))]

    return randomUnit
}

const Hit = async function (
    canHit: any,
    unit: any,
    total: any,
    round: Document<unknown, any, IBattleRound> & IBattleRound & {
        _id: Types.ObjectId;
    },
    attacker: any,
    defender: any,
    unitDead: any[],
) {
    const randomHit = randomUnitToHit(canHit)

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
    const randomStrength = getRndInteger(-0.05, 0.05)

    attackStrength += attackStrength * randomStrength

    const totalStrength = attackStrength * total
    const unitCanHitLeft = randomHit.total - (randomHit.dead || 0)

    const totalLife = randomHit.unit.life * unitCanHitLeft


    if (totalStrength < totalLife) {
        let totalDead = 0
        const instantlyKill = Math.random() * 100 <= 5 ? true : false
        if (instantlyKill) {
            totalDead = Math.ceil(totalStrength / randomHit.unit.life)
        } else {
            totalDead = Math.floor(totalStrength / randomHit.unit.life)
        }
        if (randomHit.dead) {
            randomHit.dead += totalDead
        } else {
            randomHit.dead = totalDead
        }

        const battleActions = await BattleActions.create({
            type: 1,
            battleRound: round._id,
            unitAttack: {
                user: attacker,
                unit: unit._id,
                total: Number(total),
                damage: Number(totalStrength),
            },
            unitDefend: {
                user: defender,
                unit: randomHit.unit._id,
                totalHit: Number(totalDead)
            }
        })

        const findUnitDead = unitDead.find(o => o.unit._id.toString() === randomHit.unit._id.toString())
        if (!findUnitDead) {
            unitDead.push({
                unit: randomHit.unit,
                total: Number(totalDead)
            })
        } else {
            findUnitDead.total += Number(totalDead)
        }

        round.actions.push(battleActions._id)

    } else {
        randomHit.dead = randomHit.total
        const strengthLeft = totalStrength - totalLife
        const attackUnitLeft = Math.floor(strengthLeft / attackStrength)

        const battleActions = await BattleActions.create({
            battleRound: round._id,
            type: 1,
            unitAttack: {
                user: attacker,
                unit: unit._id,
                total: Number(total - attackUnitLeft),
                damage: Number(totalStrength - strengthLeft),
            },
            unitDefend: {
                user: defender,
                unit: randomHit.unit._id,
                totalHit: Number(unitCanHitLeft)
            }
        })

        const findUnitDead = unitDead.find(o => o.unit._id.toString() === randomHit.unit._id.toString())
        if (!findUnitDead) {
            unitDead.push({
                unit: randomHit.unit,
                total: Number(unitCanHitLeft)
            })
        } else {
            findUnitDead.total += Number(unitCanHitLeft)
        }

        round.actions.push(battleActions._id)
        if (attackUnitLeft > 0) {
            await Hit(canHit, unit, attackUnitLeft, round, attacker, defender, unitDead)
        }
    }
}

async function unitHitByUnit(
    attackerUnits: any[],
    defenderUnitsWithOrder: any[],
    round: Document<unknown, any, IBattleRound> & IBattleRound & {
        _id: Types.ObjectId;
    },
    attacker: any,
    defender: any,
    unitDead: any[]
) {

    for (let i = 0; i < attackerUnits.length; i++) {
        const { unit, total } = attackerUnits[i];
        if (total <= 0) continue
        const canHit: any[] = []

        let lowestRange = 5

        defenderUnitsWithOrder.forEach(({ units }) => {
            units.forEach((defenderUnit: any) => {
                if (defenderUnit.unit.range < lowestRange && defenderUnit.total > 0) {
                    lowestRange = defenderUnit.unit.range
                }
            })
        })

        defenderUnitsWithOrder.forEach(({ units }) => {
            units.forEach((defenderUnit: any) => {
                if (defenderUnit.unit.range === lowestRange) {
                    canHit.push(defenderUnit)
                }
            })
        })

        defenderUnitsWithOrder.forEach(({ units }) => {
            units.forEach((defenderUnit: any) => {
                const isHave = canHit.find(o => o.unit._id === defenderUnit.unit._id)
                if (!isHave) {
                    canHit.push(defenderUnit)
                }
            })
        })

        await Hit(canHit, unit, total, round, attacker, defender, unitDead)
    }
}

async function attack(marching: Document<unknown, any, IMarching> & IMarching & {
    _id: Types.ObjectId;
}) {

    const defenderUnitsWithOrder = await findDefenderUnits(marching.target)
    const cloneDefenderUnitWithOrder = JSON.parse(JSON.stringify(defenderUnitsWithOrder))

    const attackerUnitsWithOrder = findAttackerUnits(marching)

    let totalRound = 1

    let round = new BattleRounds({
        name: `Round ${totalRound}`
    })


    const battle = new Battles({
        attacker: marching.user,
        defender: marching.target,
        marching: marching._id,
        rounds: [],
        attackerUnits: marching.units,
        defenderUnits: await Units.find({ user: marching.target, total: { $gt: 0 } })
    })
    const attackerDead: any[] = []
    const defenderDead: any[] = []
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
            await unitHitByUnit(attackerUnits, defenderUnitsWithOrder, round, marching.user, marching.target, defenderDead)
        }

        if (defenderUnits) {
            await unitHitByUnit(defenderUnits, attackerUnitsWithOrder, round, marching.target, marching.user, attackerDead)
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
            if (defenderUnitLeft <= 0 && attackerUnitLeft > 0) {
                battle.winner = marching.user
            }
            if (attackerUnitLeft <= 0 && defenderUnitLeft > 0) {
                battle.winner = marching.target
            }
            await round.save()
            break
        }

        index++
        if (index === 4) {
            totalRound++
            index = 0
            await round.save()
            round = new BattleRounds({
                name: `Round ${totalRound}`
            })
        }
    }

    let totalAttackerDead = 0
    attackerDead.forEach(({ unit, total }) => {
        totalAttackerDead += (unit.population * total)
    })

    let totalDefenderDead = 0
    defenderDead.forEach(({ unit, total }) => {
        totalDefenderDead += (unit.population * total)
    })

    battle.attackerDead = attackerDead
    battle.defenderDead = defenderDead
    battle.attackerExp = totalDefenderDead * 3
    battle.defenderExp = totalAttackerDead * 3

    CHANGE_EXP.push({
        user: marching.user,
        newValue: totalDefenderDead * 3
    })

    CHANGE_EXP.push({
        user: marching.target,
        newValue: totalAttackerDead * 3
    })

    await battle.save()
    await marching.save()

    for (let index = 0; index < defenderUnitsWithOrder.length; index++) {
        const { units } = defenderUnitsWithOrder[index];
        const baseUnits = cloneDefenderUnitWithOrder[index].units
        for (let index = 0; index < units.length; index++) {
            const unit = units[index];
            const baseUnit = baseUnits[index]
            const changeValue = unit.total - baseUnit.total
            const userUnit = await Units.findOne({ user: marching.target, unit: unit.unit._id })
            if (!userUnit) continue

            CHANGE_UNIT.push({
                unit: userUnit._id,
                newValue: changeValue,
            })
        }
    }

}

async function spy(target: Types.ObjectId) {
    const resources = await Resources.find({ user: target }).populate('type')
    const units = await Units.find({ user: target, total: { $gt: 0 } })
    const buildings = await Buildings.find({ user: target })

    const resource: { [key: string]: any } = {
        gold: 0,
        iron: 0,
        wood: 0,
        food: 0
    }

    resources.forEach(_res => {
        const name = _res.type.name.toLowerCase()
        resource[name] = _res.value
    })
    return { resource, units, buildings }
}

async function handleMarchingAttack(marching: Document<unknown, any, IMarching> & IMarching & { _id: Types.ObjectId; }) {
    const target = await Users.findById(marching.target)
    if (!target) return
    const targetUnit = await Units.find({ user: target._id, total: { $gt: 0 } })
    if (targetUnit.length === 0) {
        await steal(marching)
        await Battles.create({
            attacker: marching.user,
            defender: marching.target,
            marching: marching._id,
            attackerUnits: marching.units,
            defenderUnits: [],
            winner: marching.user,
            rounds: []
        })
    } else {
        await attack(marching)
    }
}

async function handleMarchingSpy(marching: Document<unknown, any, IMarching> & IMarching & { _id: Types.ObjectId; }) {
    const quickWalker = await UnitDatas.findOne({ name: 'Quickwalker' })
    const quickWalkerTarget = await Units.findOne({ user: marching.target, unit: quickWalker?._id, total: { $gt: 0 } })
    if (!quickWalkerTarget || quickWalkerTarget.total < marching.units[0].total) {
        const { resource, units, buildings } = await spy(marching.target)
        await Battles.create({
            attacker: marching.user,
            defender: marching.target,
            marching: marching._id,
            winner: marching.user,
            spy: {
                resources: resource,
                units,
                buildings,
                quickWalkerLost: quickWalkerTarget?.total ? quickWalkerTarget.total : 0
            }
        })
    }
    if (quickWalkerTarget) {
        if (quickWalkerTarget.total < marching.units[0].total) {
            marching.units[0].total -= quickWalkerTarget.total
            CHANGE_UNIT.push({
                unit: quickWalkerTarget._id,
                newValue: -quickWalkerTarget.total,
            })
        } else {
            CHANGE_UNIT.push({
                unit: quickWalkerTarget._id,
                newValue: -marching.units[0].total,
            })
            await Battles.create({
                attacker: marching.user,
                defender: marching.target,
                marching: marching._id,
                winner: marching.target,
                spy: {
                    quickWalkerLost: marching.units[0].total
                }
            })
            marching.units[0].total = 0
        }
    }
    if (marching.units[0].total === 0) {
        marching.status = 3
    } else {
        marching.status = 1
    }
    await marching.save()
}
async function handleMarchingTrade(marching: Document<unknown, any, IMarching> & IMarching & { _id: Types.ObjectId; }) {
    const targetResource = await Resources.find({ user: marching.target })
    .populate('type')
    const marchingCargo : {
        gold : number,
        iron : number,
        wood : number,
        food : number,
        [key : string] : any
    } = {
        gold : 0,
        iron : 0,
        wood : 0,
        food : 0,
    }
    targetResource.forEach(resource => {
        const name = resource.type.name.toLowerCase()
        const resourceOffer = marching.trade.offer[name]
        if(resourceOffer > 0) {
            CHANGE_RESOURCE.push({
                resource : resource._id,
                newValue : resourceOffer
            })
        }
        const resourceReceive = marching.trade.receive[name]
        if(resourceReceive > 0) {
            marchingCargo[name] = resourceReceive
        }
    })
    marching.cargo = {...marchingCargo}
    marching.status = 1
    await marching.save()
}
async function handleMarchingNotArrive() {
    const marchingsNotArrive = await Marchings.find({ arriveTime: { $lte: Date.now() }, status: 0 })
        .populate({
            path : 'trade'
        })
        .populate({
            path: "units.unit",
            populate: {
                path: "building"
            }
        })

    for (let index = 0; index < marchingsNotArrive.length; index++) {
        const marching = marchingsNotArrive[index];
        if (marching.type === 1) {
            await handleMarchingAttack(marching)
        }
        if (marching.type === 2) {
            await handleMarchingSpy(marching)
        }
        if (marching.type === 3) {
            await handleMarchingTrade(marching)
            changeMarching(marching.target.toString())
        }
        if(marching.type === 4) {
            marching.status = 1
            await marching.save()
        }
        changeMarching(marching.user.toString())
    }
}

async function handleMarchingNotHome() {
    const marchingNotHome = await Marchings.find({ homeTime: { $lte: Date.now() }, status: 1 })

    for (let index = 0; index < marchingNotHome.length; index++) {
        const marching = marchingNotHome[index];
        const cargo = marching.cargo
        const resources = await Resources.find({ user: marching.user })
            .populate('type')

        resources.forEach(resource => {
            const name = resource.type.name.toLowerCase()
            const resourceValue = cargo[name]
            if (resourceValue > 0) {
                CHANGE_RESOURCE.push({
                    resource: resource._id,
                    newValue: resourceValue,
                })
            }
        })
        marching.status = 2

        const units = marching.units
        for (let index = 0; index < units.length; index++) {
            const unit = units[index];
            const userUnit = await Units.findOne({ user: marching.user, unit: unit.unit })
            if (!userUnit) continue
            if (unit.total) {
                CHANGE_UNIT.push({
                    unit: userUnit._id,
                    newValue: unit.total
                })
            }
        }
        await marching.save()
        if(marching.type === 3) {
            const market = await Markets.findById(marching.trade)
            if(market) {
                market.status = 2
                await market.save()
            }
        }
        changeMarching(marching.user.toString())
    }
}

export default async function workerMarching() {
    let lastRun = Date.now()

    while (true) {
        await handleMarchingNotArrive()
        await handleMarchingNotHome()
        if (Date.now() - lastRun < 1000) {
            await waitfor(1000 - (Date.now() - lastRun))
        }
        lastRun = Date.now()
    }

}