import {Response} from "express";
import {Buildings, Units} from 'models'
import { IRequest } from "interfaces";
import { CHANGE_UNIT } from "../worker/workerChangeUnit";
class unitController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Units.find({user : _id})
        .populate('unit user')
        res.send({status : 1 , data})
    }

    static async patch (req : IRequest , res : Response) {
        const {data} = req.query
        if(!data?.[0]?.unit)  return res.send({status : 100})

        for (let index = 0; index < data.length; index++) {
            const {unit, type , value} = data[index];
            const findUnit = await Units.findById(unit)
            if(!findUnit) continue

            if(type === 'movein'){
                CHANGE_UNIT.push({
                    unit : findUnit._id,
                    newValue : -value,
                    moveTower : true
                })
            }
            if(type === 'moveout') {
                CHANGE_UNIT.push({
                    unit : findUnit._id,
                    newValue : value,
                    moveTower : true
                })
            }
        }
        res.send({status : 1})
    }
}

export default unitController