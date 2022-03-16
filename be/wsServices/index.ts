import { Buildings, Resources } from "models";
import io from "../ws";

export async function changeResources(_id : string) {
    const resources = await Resources.find({user : _id}).populate('type').lean()
    io.to(_id).emit('resources' , {data : resources})
}

export async function changeBuilding(_id : string) {
    const data = await Buildings.find({user : _id})
    .populate('building')
    
    io.to(_id).emit('building' , {data})
}