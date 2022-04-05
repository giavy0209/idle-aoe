import { Buildings, Marchings, Markets, Resources, Trainnings, Units, Users } from "models";
import io from "../ws";

export async function changeUser(_id: string) {
    const user = await Users.findById(_id)
        .populate('world clan')
    io.to(_id).emit('user', { data: user })
}

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
    const data = await Trainnings.find({ user: _id })
        .populate('unit')
    io.to(_id).emit('trainning-queue', { data })
}

export async function changeUnit(_id: string) {
    const data = await Units.find({ user: _id })
        .populate('unit user')

    io.to(_id).emit('units', { data })
}

export async function changeMarching(_id: string) {
    const marchingFrom = await Marchings.find({
        user : _id , 
        status : {$in : [0 , 1]}
    })
    .populate('user target units.unit')

    const marchingTo = await Marchings.find({
        target : _id , 
        status : {$in : [0]},
        type : {$in : [3]}
    })
    .populate('user target units.unit')
    const data = [...marchingFrom, ...marchingTo]
    io.to(_id).emit('marching', { data })
}

export async function changeMarketOffer(_id: string) {
    const data = await Markets.find({ user: _id, status: 0 })
    .sort({ _id: -1 })

    io.to(_id).emit('market-offer', { data })
}