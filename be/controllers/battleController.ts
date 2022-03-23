import {Response} from "express";
import {Battles} from 'models'
import { IRequest } from "interfaces";
class battleController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Battles.find({user : _id})
        .populate({
            path : 'marching attacker defender rounds',
            populate : {
                path : "rounds.actions"
            }
        })
        res.send({status : 1 , data})
    }
}

export default battleController