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
}

export default unitController