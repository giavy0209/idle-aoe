import {Response} from "express";
import {Buildings} from 'models'
import { IRequest } from "interfaces";
class buildingController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        console.log(await Buildings.find({user : _id})
        .populate('building'));
        // const data = await Buildings.find({user : _id})
        // .populate('building')
        
        res.send({status : 1})
    }
}

export default buildingController