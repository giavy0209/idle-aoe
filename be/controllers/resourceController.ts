import {Response} from "express";
import {Castles, Resources} from 'models'
import { ICastle, IRequest } from "interfaces";
class resourceController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const {castle} = req.query
        let findCastle;

        if(castle) findCastle = await Castles.findById(castle)
        if(!findCastle) findCastle = await Castles.findOne({user : _id})
        const data = await Resources.find({user : _id , castle : findCastle?._id})
        .populate('type')
        
        res.send({status : 1 , data})
    }
}

export default resourceController