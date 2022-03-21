import { IMarching } from "interfaces";
import { Marchings, Resources, Units, Users } from "models";
import { Document, Types } from "mongoose";

async function steal (marching : Document<unknown, any, IMarching> & IMarching & {
    _id: Types.ObjectId;
}) {
    const targetResource = await Resources.find({user : marching.target})
    .populate('type')
    let cargo = 0
   
    marching.units.forEach(unit => {
        cargo += unit.unit.cargo * unit.total
    })
    
    let totalResource = 0
    targetResource.forEach(resource => {
        totalResource += resource.value
    })

    let cargoPerRes = 0
     
    if(totalResource > cargo) Math.floor(cargo / 4)
    
    targetResource.forEach(resource => {
        const resourceName = resource.type.name.toLowerCase()
        if(!cargoPerRes) cargoPerRes = Math.floor(resource.value)
        marching.cargo[resourceName] = cargoPerRes
        resource.value -= cargoPerRes
        resource.save()
    })
    console.log(marching.cargo);
    
}

export default async function workerMarching () {
    const marchingsNotArrive = await Marchings.find({arriveTime : {$lte : Date.now()} , status : 0})
    .populate('units.unit')
    
    for (let index = 0; index < marchingsNotArrive.length; index++) {
        const marching = marchingsNotArrive[index];
        const target = await Users.findById(marching.target)
        if(!target) continue
        const targetUnit = await Units.find({user : target._id, total : {$gt : 0}})
        if(targetUnit.length === 0) {
            await steal(marching)
        }

    }
}