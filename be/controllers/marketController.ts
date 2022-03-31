import { Response } from "express";
import { Battles, Buildings, Marchings, Markets, Resources, Users } from 'models'
import { IRequest } from "interfaces";
import { isValidObjectId, Types } from "mongoose";
import { CHANGE_RESOURCE } from "../worker/workerChangeResource";
import { changeMarching, changeMarketOffer } from "wsServices";
class marketController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        const data = await Markets.find({ user: _id, status: 0 })
            .sort({ _id: -1 })
        res.send({ status: 1, data })
    }

    static async post(req: IRequest, res: Response) {
        const { _id } = req
        const { offer, receive } = req.body

        if ((!offer || !receive)) return res.send({ status: 100 })

        let totalOffer = 0
        let totalReceive = 0

        for (const key in offer) {
            if (Object.prototype.hasOwnProperty.call(offer, key)) {
                const value = offer[key];
                totalOffer += value
            }
        }

        for (const key in receive) {
            if (Object.prototype.hasOwnProperty.call(receive, key)) {
                const value = receive[key];
                totalReceive += value
            }
        }

        if (totalOffer !== totalReceive) return res.send({ status: 100, msg: 'not equal' })

        const user = await Users.findById(_id)
        if (!user || !user.clan) return res.send({ status: 102 })

        const marketBuilding = (await Buildings.aggregate([
            {
                $match: {
                    user: new Types.ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: 'building_datas',
                    localField: 'building',
                    foreignField: '_id',
                    as: 'building'
                }
            },
            {
                $unwind: {
                    path: '$building'
                }
            },
            {
                $match: {
                    "building.name": 'Market'
                }
            }
        ]))[0]

        if (!marketBuilding) return res.send({ status: 100, msg: 'not found market' })

        const marchings = await Marchings.find({ user: _id, type: { $in: [3, 4] }, status: { $ne: 2 } })

        let marketCargo = marketBuilding.value

        marchings.forEach(marching => {
            for (const key in marching.cargo) {
                if (Object.prototype.hasOwnProperty.call(marching.cargo, key)) {
                    const value = marching.cargo[key];
                    marketCargo -= value
                }
            }
        })

        const markets = await Markets.find({ user: _id, status: { $ne: 2 } })

        markets.forEach(market => {
            for (const key in market.offer) {
                if (Object.prototype.hasOwnProperty.call(market.offer, key)) {
                    const value = market.offer[key];
                    marketCargo -= value
                }
            }
        })

        if (totalOffer > marketCargo) return res.send({ status: 101 })

        const userResources = await Resources.find({ user: _id })
            .populate('type')

        let isEnoughRes = true

        const changeResourceData = []

        for (const key in offer) {
            if (Object.prototype.hasOwnProperty.call(offer, key)) {
                const value = offer[key];
                const userResource = userResources.find(o => (o.type.name.toLowerCase() === key.toLocaleLowerCase() && o.value >= value))
                if (!userResource) {
                    isEnoughRes = false
                    break
                }
                changeResourceData.push({
                    resource: userResource._id,
                    newValue: value,
                    type: 'move-to-market'
                })
            }
        }

        if (!isEnoughRes) return res.send({ status: 100, msg: 'not enough' })
        changeResourceData.forEach(data => {
            CHANGE_RESOURCE.push(data)
        })
        await Markets.create({
            user: _id,
            clan: user.clan,
            offer: offer,
            receive: receive,
            status: 0,
            endAt: Date.now() + 12 * 60 * 60 * 1000, //end after 12h
        })
        res.send({ status: 1 })
        changeMarketOffer(_id)
    }

    static async getClan(req: IRequest, res: Response) {
        const { _id } = req
        const user = await Users.findById(_id)
        if (!user || !user.clan) return res.send({ status: 100 })

        const data = await Markets.find({ clan: user.clan, user: { $ne: _id }, status: 0 })
            .populate('user')
            .sort({ _id: -1 })

        res.send({ status: 1, data })
    }


    static async putClan(req: IRequest, res: Response) {
        const { _id } = req
        const id = req.params.id
        if (!isValidObjectId(id)) return res.send({ status: 100, msg: 'not valid id' })

        const market = await Markets.findOne({ _id: id, status: 0 })
        if (!market) return res.send({ status: 100 })

        const userOffer = await Users.findById(market.user)
        const userReceive = await Users.findById(_id)
            .populate('world')
        if (!userOffer || !userReceive || userOffer.clan.toString() !== userReceive.clan.toString()) return res.send({ status: 100, msg: 'not found clan' })
        
        const userReceiveResources = await Resources.find({user : _id})
        .populate('type')
        let isEnoughRes = true

        const changeResourceData = []

        for (const key in market.receive) {
            if (Object.prototype.hasOwnProperty.call(market.receive, key)) {
                const value = market.receive[key];
                const userResource = userReceiveResources.find(o => (o.type.name.toLowerCase() === key.toLocaleLowerCase() && o.value >= value))
                if (!userResource) {
                    isEnoughRes = false
                    break
                }
                changeResourceData.push({
                    resource: userResource._id,
                    newValue: value,
                    type: 'move-to-market'
                })
            }
        }

        if(!isEnoughRes) return res.send({status : 101})

        const movingTime = 15 * 60 * 1000 / userReceive.world.speed

        await Marchings.create({
            user: userOffer._id,
            target: userReceive._id,
            cargo: market.offer,
            type: 3,
            unitSpeed: 15,
            movingSpeed: 1,
            arriveTime: Date.now() + movingTime,
            homeTime: Date.now() + movingTime * 2
        })
        market.status = 1
        await market.save()

        res.send({ status: 1 })


        changeMarching(_id)
        changeMarching(userOffer._id.toString())
        changeMarketOffer(userOffer._id.toString())
    }

}

export default marketController