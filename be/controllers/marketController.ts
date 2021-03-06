import { Response } from "express";
import { Battles, Buildings, Castles, Marchings, Markets, Resources, Users } from 'models'
import { IRequest } from "interfaces";
import { isValidObjectId, Types } from "mongoose";
import { CHANGE_RESOURCE } from "../worker/workerChangeResource";
import { changeMarching, changeMarketOffer } from "wsServices";
import { marketService } from "services";
class marketController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        const {castle} = req.query
        let findCastle
        if(castle) findCastle = await Castles.findById(castle)
        if(!findCastle) findCastle = await Castles.findOne({user : _id})
        const data = await Markets.find({ user: _id, status: 0 , castle : findCastle?._id })
            .sort({ _id: -1 })
        res.send({ status: 1, data })
    }

    static async post(req: IRequest, res: Response) {
        const { _id } = req
        const { offer, receive , castle} = req.body


        if ((!offer || !receive || !castle || !isValidObjectId(castle))) return res.send({ status: 100 })

        const findCastle = await castle.findById(castle)
        if(findCastle) return res.send({status : 100})

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

        const marketCargo = await marketService.calcTotalCargo({user : user._id, castle : findCastle._id})

        if (totalOffer > marketCargo) return res.send({ status: 101 })

        const userResources = await Resources.find({ user: _id , castle : findCastle._id})
            .populate('type')

        let isEnoughRes = true
        const changeResourceData = []
        for (const key in offer) {
            if (Object.prototype.hasOwnProperty.call(offer, key)) {
                const value = offer[key];
                if (!value) continue
                const userResource = userResources.find(o => (o.type.name.toLowerCase() === key.toLocaleLowerCase() && o.value >= value))
                if (!userResource) {
                    isEnoughRes = false
                    break
                }
                changeResourceData.push({
                    resource: userResource._id,
                    newValue: -value,
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
            castle : findCastle._id,
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
        const {castle} = req.body
        
        if (!isValidObjectId(id) || !castle || !isValidObjectId(castle)) return res.send({ status: 100, msg: 'not valid id' })
        const findCastle = await Castles.findById(castle)
        if(!findCastle) return res.send({ status: 100, msg: 'not find castle' })
        const market = await Markets.findOne({ _id: id, status: 0})
        if (!market) return res.send({ status: 100 })

        const userOffer = await Users.findById(market.user)
        const userReceive = await Users.findById(_id)
            .populate('world')
        if (!userOffer || !userReceive || userOffer.clan.toString() !== userReceive.clan.toString()) return res.send({ status: 100, msg: 'not found clan' })

        const userReceiveResources = await Resources.find({ user: _id , castle : findCastle._id})
            .populate('type')
        let isEnoughRes = true

        const changeResourceData = []

        for (const key in market.receive) {
            if (Object.prototype.hasOwnProperty.call(market.receive, key)) {
                const value = market.receive[key];
                if (!value) continue
                const userResource = userReceiveResources.find(o => (o.type.name.toLowerCase() === key.toLocaleLowerCase() && o.value >= value))
                if (!userResource) {
                    isEnoughRes = false
                    break
                }
                changeResourceData.push({
                    resource: userResource._id,
                    newValue: -value,
                })
            }
        }

        if (!isEnoughRes) return res.send({ status: 101 })
        changeResourceData.forEach(data => {
            CHANGE_RESOURCE.push(data)
        })
        const movingTime = 15 * 60 * 1000 / userReceive.world.speed

        await Marchings.create({
            user: userOffer._id,
            target: userReceive._id,
            cargo: market.offer,
            type: 3,
            unitSpeed: 15,
            movingSpeed: 1,
            arriveTime: Date.now() + movingTime,
            homeTime: Date.now() + movingTime * 2,
            trade: market._id,
            fromCastle : market.castle,
            targetCastle : findCastle._id
        })
        market.status = 1
        await market.save()

        res.send({ status: 1 })


        changeMarching(_id)
        changeMarching(userOffer._id.toString())
        changeMarketOffer(userOffer._id.toString())
    }

    static async postCaravan(req: IRequest, res: Response) {
        const { _id } = req
        const { data, speed , castle } = req.body
        if (speed < 10 || speed > 600 || !castle || !isValidObjectId(castle)) return res.send({ status: 101 })
        if (!data?.[0]?._id || data.length > 4) return res.send({ status: 100 })

        const findCastle = await Castles.findById(castle)
        if(!findCastle) return res.send({ status: 100 }) 

        const changeResourceData: {
            resource: string,
            newValue: number
        }[] = []

        const marchingCargo : {
            gold: number,
            iron: number,
            wood: number,
            food: number,
            [key : string] : any
        }= {
            gold: 0,
            iron: 0,
            wood: 0,
            food: 0
        }

        let totalCargo = 0

        for (let index = 0; index < data.length; index++) {
            const _data = data[index];
            if (!isValidObjectId(_id) || !_data.value) return res.send({ status: 100 })

            const resource = await Resources.findOne({ _id: _data._id, user: _id, value: { $gte: _data.value } })
                .populate('type')
            if (!resource) return res.send({ status: 100 })
            changeResourceData.push({
                resource: resource._id.toString(),
                newValue: -_data.value
            })
            const resourceName = resource.type.name.toLowerCase()
            marchingCargo[resourceName] = _data.value
            totalCargo += _data.value
        }
        
        const marketCargo = await marketService.calcTotalCargo({user : _id, castle : findCastle._id})

        if(marketCargo < totalCargo) return res.send({status : 100})

        const movingTime = speed * 60 * 1000
        await Marchings.create({
            user: _id,
            cargo: marchingCargo,
            arriveTime: Date.now() + movingTime,
            homeTime: Date.now() + movingTime * 2,
            type: 4,
            movingSpeed: 1,
            unitSpeed: speed,
            fromCastle : findCastle._id
        })

        res.send({ status: 1 })
        changeResourceData.forEach(data => CHANGE_RESOURCE.push(data))
        changeMarching(_id)
    }

}

export default marketController