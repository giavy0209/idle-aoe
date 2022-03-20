import {Response} from "express";
import {Buildings} from 'models'
import { IRequest } from "interfaces";
class buildingController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Buildings.find({user : _id})
        .populate('building user')
        res.send({status : 1 , data})
    }
}

export default buildingController