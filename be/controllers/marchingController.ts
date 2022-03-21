import {Response} from "express";
import {Buildings, Marchings, Units, Users} from 'models'
import { IRequest } from "interfaces";
import { isValidObjectId } from "mongoose";
import { changeUnit } from "../wsServices";
class marchingController {
    static async attack (req : IRequest , res : Response) {
        const {_id} = req
        let {type} = req.query
        let _type = Number(type)
        if (!_type) return res.send({status : 100})

        let {units , movingSpeed,target} = req.body

        if(movingSpeed < 0.1 || movingSpeed > 1 || !isValidObjectId(target)) return res.send({status : 100})
        const checkUnit : any[] = []

        for (let index = 0; index < units.length; index++) {
            const _unit = units[index];
            const userUnit = await Units.findById(_unit._id)
            if(!userUnit) return res.send({status : 100})
            if(userUnit.total < _unit.total) {
                return res.send({status : 100})
            }
            if(_unit.total > 0) {
                checkUnit.push({..._unit})
            }
            
        }

        units = checkUnit

        if(!units.length) return res.send({status : 101})
        
        const findTarget = await Users.findById(target)
        if(!findTarget) return res.send({status : 100})

        let unitSpeed = 0
        units.forEach((_unit : {[key : string] : any}) => {
            if(_unit.unit.speed > unitSpeed) unitSpeed = _unit.unit.speed
        })

        const speed = unitSpeed * 60 / movingSpeed
        const arriveTime = Date.now() + speed * 1000
        const homeTime = Date.now() + speed * 1000 * 2
        await Marchings.create({
            unitSpeed ,
            units,
            target,
            user :_id,
            type : _type,
            movingSpeed,
            arriveTime,
            homeTime,
        })
        for (let index = 0; index < units.length; index++) {
            const _unit = units[index];
            const userUnit = await Units.findById(_unit._id)
            if(!userUnit) continue
            userUnit.total -= _unit.total
            await userUnit.save()
        }
        changeUnit(_id)
        res.send({status : 1})
    }
}

export default marchingController