import { IMarching } from "interfaces";
import { Marchings, Resources, Units, Users } from "models";
import { Document, Types } from "mongoose";
import { changeResources } from "wsServices";
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

async function attack(marching: Document<unknown, any, IMarching> & IMarching & {
    _id: Types.ObjectId;
}) {
    
    console.log(marching.units);
    




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

    const marchingNotHome = await Marchings.find({ homeTime: { $lte: Date.now() }, status: 1 })

    for (let index = 0; index < marchingNotHome.length; index++) {
        const marching = marchingNotHome[index];
        const cargo = marching.cargo
        const resources = await Resources.find({user : marching.user})
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
            const userUnit = await Units.findOne({user : marching.user , unit : unit.unit})
            if(!userUnit) continue
            CHANGE_UNIT.push({  
                unit : userUnit._id,
                newValue : unit.total
            })
        }
        await marching.save()
    }
}