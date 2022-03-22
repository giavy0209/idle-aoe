import { IMarching } from "interfaces";
import { Marchings, Resources, Units, Users } from "models";
import { Document, Types } from "mongoose";
import { CHANGE_RESOURCE } from "./workerChangeResource";

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

        const resourceName = resource.type.name.toLowerCase()

        marching.cargo[resourceName] = resourceCanSteal

        CHANGE_RESOURCE.push({
            resource: resource._id,
            newValue: -resourceCanSteal,
        })
    })
}

async function attack(marching: Document<unknown, any, IMarching> & IMarching & {
    _id: Types.ObjectId;
}) {
    const targetUnit = await Units.aggregate([
        {
            $match: { user: marching.target, total: { $gt: 0 } }
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
                path: "$unit"
            }
        },
        {
            $group: {
                _id: "$unit.building",
                units: {
                    $push: {
                        unit: "$unit",
                        total: "$total"
                    },
                }
            }
        },
        {
            $lookup: {
                from: 'building_datas',
                localField: '_id',
                foreignField: '_id',
                as: 'building'
            }
        },
        {
            $unwind: {
                path: "$building",
            }
        },
        {
            $sort: {
                "building.attackOrder": 1
            }
        },
        {
            $project: {
                _id: 0,
                units: 1
            }
        }
    ])

    const marchingUnit = marching.units




    // find({user : marching.target, total : {$gt : 0}})
    // .populate('unit_datas')
}

export default async function workerMarching() {
    const marchingsNotArrive = await Marchings.find({ arriveTime: { $lte: Date.now() }, status: 0 })
        .populate('units.unit')

    for (let index = 0; index < marchingsNotArrive.length; index++) {
        const marching = marchingsNotArrive[index];
        const target = await Users.findById(marching.target)
        if (!target) continue
        const targetUnit = await Units.find({ user: target._id, total: { $gt: 0 } })
        if (targetUnit.length === 0) {
            await steal(marching)
        } else {
            await attack(marching)
        }

    }
}