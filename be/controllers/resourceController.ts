import {Response} from "express";
import {Resources} from 'models'
import { IRequest } from "interfaces";
class resourceController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Resources.find({user : _id})
        .populate('type')
        
        res.send({status : 1 , data})
    }
}

export default resourceController