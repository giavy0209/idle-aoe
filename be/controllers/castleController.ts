import {Response} from "express";
import {Buildings, Castles} from 'models'
import { IRequest } from "interfaces";
import { castleService } from "services";
class castleController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Castles.find({user : _id,isGhost : false})
        res.send({status : 1 , data})
    }

    static async getOne (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Castles.findOne({user : _id,isGhost : false})
        res.send({status : 1 , data})
    }

    static async getGhost (req : IRequest , res : Response) {
        const {_id} = req
        let ghostCastle = await Castles.findOne({user : _id, isGhost : true})
        if(!ghostCastle) {
            ghostCastle = await castleService.create({user : _id , isGhost : true, isCapital : false, name : 'Ghost Castle'})
        }
        res.send({status : 1 , data : ghostCastle })
    }
}

export default castleController