import {Response} from "express";
import {BuildingDatas, Buildings, Resources} from 'models'
import { IRequest, IResourceData } from "interfaces";
import { changeBuilding, changeResources } from "wsServices";
import { CHANGE_RESOURCE } from "../worker/workerChangeResource";
class upgradeController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const {building} = req.query
        const buildingData = await BuildingDatas.findOne({name : building}).lean()
        if(!buildingData) return res.send({status : 100})

        const userBuilding = await Buildings.findOne({user : _id, building : buildingData._id}).lean()
        if(!userBuilding) return res.send({status : 100})

        const buildingLevel = userBuilding.level + 1
        const findUpgrade = buildingData.upgrade.find(o => o.level === buildingLevel)
        if(!findUpgrade) return res.send({status : 101})

        res.send({status : 1, data : {...findUpgrade , name : buildingData.name, _id : userBuilding._id}})
    }
    static async post (req : IRequest, res : Response) {
        const {_id} = req
        const {building} = req.query
        const userBuilding = await Buildings.findById(building)
        if(!userBuilding) return res.send({status : 100})
        const buildingLevel = userBuilding.level + 1

        const buildingData = await BuildingDatas.findById(userBuilding.building)
        if(!buildingData) return res.send({status : 100})
        const findUpgrade = buildingData.upgrade.find(o => o.level === buildingLevel)
        if(!findUpgrade) return res.send({status : 101})

        const isUpgrading = await Buildings.findOne({user : _id , isUpgrade : true})
        if(isUpgrading) return res.send({status : 103})

        const userResource = await Resources.find({user : _id})
        .populate('type')
        let isEnoughResource = true
        
        userResource.forEach(el => {
            const resource = el.type.name.toLowerCase()
            const value = el.value
            if(findUpgrade[resource] > value ) isEnoughResource = false
        })
        if(!isEnoughResource) return res.send({status : 102})


        userBuilding.finishAt = Date.now() + findUpgrade.time * 1000
        userBuilding.isUpgrade = true
        await userBuilding.save()

        for (let index = 0; index < userResource.length; index++) {
            const resource = userResource[index];
            const name = resource.type.name.toLowerCase();
            
            CHANGE_RESOURCE.push({
                resource : resource._id,
                newValue : -findUpgrade[name],
            })
        }
        changeBuilding(_id)
        res.send({status : 1})
    }
}

export default upgradeController