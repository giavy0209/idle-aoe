import {Response} from "express";
import {BuildingDatas, Buildings, Units} from 'models'
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
        const {_id} = req
        const {data} = req.body
        if(!data?.[0]?.unit)  return res.send({status : 100})
        const tower = await BuildingDatas.findOne({name : 'Tower'})
        if(!tower) return res.send({status : 100})
        const userTower = await Buildings.findOne({user :_id , building : tower._id})
        if(!userTower) return res.send({status : 100})

        const units = await Units.find({user : _id})
        .populate('unit')
        let inTower = 0

        units.forEach(o => inTower+= o.unit.population * o.total)

        const changeUnitData = []

        for (let index = 0; index < data.length; index++) {
            const {unit, type , value} = data[index];
            const findUnit = await Units.findById(unit)
            .populate('unit')
            
            if(!findUnit) continue
            
            if(type === 'movein'){
                inTower += findUnit.unit.population * value
                changeUnitData.push({
                    unit : findUnit._id,
                    newValue : -value,
                    moveTower : true
                })
            }
            if(type === 'moveout') {
                inTower -= findUnit.unit.population * value
                changeUnitData.push({
                    unit : findUnit._id,
                    newValue : value,
                    moveTower : true
                })
            }
            if(inTower > userTower.value) return res.send({status : 101})
        }
        changeUnitData.forEach(unitData => {
            CHANGE_UNIT.push(unitData)
        })
        res.send({status : 1})
    }
}

export default unitController