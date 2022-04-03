import {Response} from "express";
import {Buildings, Castles} from 'models'
import { IRequest } from "interfaces";
class buildingController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const {castle} = req.query
        let findCastle
        if(castle) findCastle = await Castles.findById(castle)
        findCastle = await Castles.findOne({user : _id})
        const data = await Buildings.find({user : _id,castle : findCastle?._id})
        .populate('building user')
        res.send({status : 1 , data})
    }
}

export default buildingController