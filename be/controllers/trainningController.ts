import {Response} from "express";
import {BuildingDatas, Buildings, Resources, Trainnings, UnitDatas, Units, Users} from 'models'
import { IRequest, IResourceData } from "interfaces";
import { changeBuilding, changeResources, changeTrainningQueue } from "wsServices";
import { CHANGE_RESOURCE } from "../worker/workerChangeResource";
class trainningController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const {unit} = req.query
        const unitData = await UnitDatas.findOne({name : unit}).lean()
        if(!unitData) return res.send({status : 100})

        const building = await Buildings.findOne({user : _id ,building : unitData.building})
        if(!building) return res.send({status : 100})

        const time = unitData.time - unitData.time * building.value / 100
        res.send({status : 1, data : {...unitData , ...unitData.resource, time} })
    }
    static async post (req : IRequest, res : Response) {
        const {_id} = req
        let {unit , total} = req.body
        total = Number(total)
        if(!total) return res.send({status : 100})
        const isTranning = await Trainnings.findOne({user : _id})
        if(isTranning) return res.send({status : 101})

        const user = await Users.findById(_id)
        .populate('world')

        if(!user) return res.send({status : 100})

        const unitData = await UnitDatas.findById(unit)
        if(!unitData) return res.send({status : 100})
        const baseCost : {[key : string ] : any} = {...unitData.resource}
        const costs : {[key : string] : any} = {...unitData.resource}

        for (const key in baseCost) {
            if (Object.prototype.hasOwnProperty.call(baseCost, key)) {
                const _resource = baseCost[key];
                costs[key] = _resource * total
            }
        }

        const userResource = await Resources.find({user : _id})
        .populate('type')
        if(!userResource) return res.send({status : 100})
        let isEnoughResource = true

        userResource.forEach(el => {
            const resource = el.type.name.toLowerCase()
            const value = el.value
            if(costs[resource] > value ) isEnoughResource = false
        })

        if(!isEnoughResource) return res.send({status : 102})

        const building = await Buildings.findOne({user : _id, building : unitData.building})
        const dereaseTime = building ? building.value / 100 : 0
        const unitTrainingTime = unitData.time / user.world.speed
        const time = unitTrainingTime - unitTrainingTime * dereaseTime
        const finishAt = Date.now() + time * 1000

        const userUnit = await Units.findOne({user : _id, unit})
        await Trainnings.create({
            user: _id,
            unit,
            userUnit : userUnit?._id ,
            building : unitData.building,
            userBuilding : building?._id,
            total,
            finishAt,
            time :  Date.now() + time * 1000 * total
        })

        for (let index = 0; index < userResource.length; index++) {
            const resource = userResource[index];
            const name = resource.type.name.toLowerCase();
            CHANGE_RESOURCE.push({
                resource : resource._id,
                newValue : -costs[name]
            })
        }

        changeTrainningQueue(_id)
        res.send({status : 1})
    }
    static async getTrainningQueue (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Trainnings.findOne({user : _id})
        .populate('unit')
        res.send({status : 1, data})
    }
}

export default trainningController