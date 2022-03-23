import { Buildings, Marchings, Resources, Trainnings, Units } from "models";
import io from "../ws";

export async function changeResources(_id: string) {
    const resources = await Resources.find({ user: _id }).populate('type').lean()
    io.to(_id).emit('resources', { data: resources })
}

export async function changeBuilding(_id: string) {
    const data = await Buildings.find({ user: _id })
        .populate('building')

    io.to(_id).emit('building', { data })
}

export async function changeTrainningQueue(_id: string) {
    const data = await Trainnings.findOne({ user: _id })
        .populate('unit')
    io.to(_id).emit('trainning-queue', { data })
}

export async function changeUnit(_id : string) {
    const data = await Units.find({ user: _id })
        .populate('unit user')

    io.to(_id).emit('units', { data })
}

export async function changeMarching(_id : string) {
    const data = await Marchings.find({user : _id , status : {$in : [0, 1]}})
    .populate('user target units.unit')
    io.to(_id).emit('marching' , {data})
}