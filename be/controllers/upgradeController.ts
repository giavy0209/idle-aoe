import { Response } from "express";
import { BuildingDatas, Buildings, Castles, Resources, Users, Worlds } from 'models'
import { IRequest, IResourceData } from "interfaces";
import { changeBuilding, changeResources, changeUser } from "wsServices";
import { CHANGE_RESOURCE } from "../worker/workerChangeResource";
import { isValidObjectId } from "mongoose";
import { CHANGE_EXP } from "../worker/workerChangeEXP";
class upgradeController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        const { building , castle} = req.query
        const buildingData = await BuildingDatas.findOne({ name: building }).lean()
        if (!buildingData) return res.send({ status: 100 })

        const userBuilding = await Buildings.findOne({ user: _id, building: buildingData._id,castle }).lean()
        if (!userBuilding) return res.send({ status: 100 })

        const buildingLevel = userBuilding.level + 1
        const findUpgrade = buildingData.upgrade.find(o => o.level === buildingLevel)
        if (!findUpgrade) return res.send({ status: 101 })

        res.send({ status: 1, data: { ...findUpgrade, name: buildingData.name, _id: userBuilding._id } })
    }
    static async post(req: IRequest, res: Response) {
        const { _id } = req
        const { building} = req.query
        const {castle} = req.body
        const findCastle = await Castles.findById(castle)
        if (!findCastle) return res.send({ status: 100 })
        const userBuilding = await Buildings.findOne({_id : building, castle : findCastle._id})
            .populate('user')
        if (!userBuilding) return res.send({ status: 100 })

        const world = await Worlds.findById(userBuilding.user.world)
        if (!world) return res.send({ status: 100 })

        const buildingLevel = userBuilding.level + 1

        const buildingData = await BuildingDatas.findById(userBuilding.building)
        if (!buildingData) return res.send({ status: 100 })
        const findUpgrade = buildingData.upgrade.find(o => o.level === buildingLevel)
        if (!findUpgrade) return res.send({ status: 101 })

        const isUpgrading = await Buildings.findOne({ user: _id, isUpgrade: true , castle : findCastle._id})
            .populate('user')
        if (isUpgrading) return res.send({ status: 103 })

        const userResource = await Resources.find({ user: _id , castle : findCastle._id})
            .populate('type')
        let isEnoughResource = true

        userResource.forEach(el => {
            const resource = el.type.name.toLowerCase()
            const value = el.value
            if (findUpgrade[resource] > value) isEnoughResource = false
        })
        if (!isEnoughResource) return res.send({ status: 102 })

        userBuilding.finishAt = Date.now() + findUpgrade.time * 1000 / world.speed
        userBuilding.isUpgrade = true
        await userBuilding.save()

        let resourceUsed = 0

        for (let index = 0; index < userResource.length; index++) {
            const resource = userResource[index];
            const name = resource.type.name.toLowerCase();
            CHANGE_RESOURCE.push({
                resource: resource._id,
                newValue: -findUpgrade[name],
            })
            resourceUsed += findUpgrade[name]
        }

        CHANGE_EXP.push({
            user : _id,
            newValue : resourceUsed
        })

        changeBuilding(_id)
        res.send({ status: 1 })
    }

    static async cancel(req: IRequest, res: Response) {
        const { _id } = req
        const { building } = req.body
        if (!isValidObjectId(building)) return res.send({ status: 100 })
        const findBuilding = await Buildings.findById(building)
        if (!findBuilding) return res.send({ status: 100 })
        findBuilding.isUpgrade = false
        await findBuilding.save()
        res.send({ status: 1 })
        changeBuilding(_id)
    }

}

export default upgradeController