import {Response} from "express";
import {Battles} from 'models'
import { IRequest } from "interfaces";
class battleController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Battles.find({user : _id})
        .populate('marching attacker defender')
        .populate({
            path : 'rounds',
            populate : "actions"
        })
        .sort({_id : -1})
        res.send({status : 1 , data})
    }
}

export default battleController