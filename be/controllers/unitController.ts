import {Response} from "express";
import {Buildings, Units} from 'models'
import { IRequest } from "interfaces";
class unitController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Units.find({user : _id})
        .populate('unit user')
        res.send({status : 1 , data})
    }
    static async post (req : IRequest , res : Response) {
        const user = req.body.user
        await Units.updateMany({user : user} , {total : 50000})
    }
}

export default unitController