import {Response} from "express";
import {Buildings, Castles} from 'models'
import { IRequest } from "interfaces";
class castleController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Castles.find({user : _id})
        res.send({status : 1 , data})
    }

    static async getOne (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Castles.findOne({user : _id})
        res.send({status : 1 , data})
    }
}

export default castleController