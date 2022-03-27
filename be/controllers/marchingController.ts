import {Response} from "express";
import { Marchings, Units, Users} from 'models'
import { IRequest } from "interfaces";
import { isValidObjectId } from "mongoose";
import { changeMarching } from "../wsServices";
import { CHANGE_UNIT } from "../worker/workerChangeUnit";
class marchingController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const marching = await Marchings.find({user : _id , status : {$in : [0 , 1]}})
        .populate('user target units.unit')
        res.send({
            status : 1 ,
            data : marching
        })
    }
    static async attack (req : IRequest , res : Response) {
        const {_id} = req
        let {type} = req.query
        let _type = Number(type)
        if (!_type) return res.send({status : 100})
        let {units , movingSpeed,target} = req.body

        const user = await Users.findById(_id)
        .populate('world')
        if(!user) return res.send({status : 100})

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

        const speed = unitSpeed * 60 / movingSpeed / user.world.speed
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
            CHANGE_UNIT.push({
                unit : _unit._id,
                newValue : -_unit.total
            })
        }
        changeMarching(_id)
        res.send({status : 1})
    }
    static async return (req : IRequest , res : Response) {
        const {marching} = req.body
        if(!marching || !isValidObjectId(marching)) return res.send({status : 100})

        const findMarching = await Marchings.findOne({_id : marching , status : 0})
        if(!findMarching) return res.send({status : 100})
        if(new Date(findMarching.arriveTime).getTime() - Date.now() < 30000 ) return res.send({status : 101})
        const movingTime = new Date(findMarching.arriveTime).getTime() - new Date(findMarching.startTime).getTime()
        findMarching.homeTime = Date.now() + movingTime
        findMarching.status = 1
        await findMarching.save()
        changeMarching(findMarching.user.toString())
    }
}

export default marchingController