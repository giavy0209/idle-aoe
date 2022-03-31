import { Response } from "express";
import { Battles, Buildings, Marchings, Markets, Users } from 'models'
import { IRequest } from "interfaces";
import { Types } from "mongoose";
class marketController {
    static async get(req: IRequest, res: Response) {
        
    }

    static async post(req: IRequest, res: Response) {
        const {_id} = req
        const {offer, receive} = req.body

        if(!offer?.[0]?.resource || !receive?.[0]?.resource ) return res.send({status : 100})

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

        if(totalOffer !== totalReceive) return res.send({status : 100})

        const user = await Users.findById(_id)   
        if(!user || !user.clan) return res.send({status : 100})

        const marketBuilding = (await Buildings.aggregate([
            {
                $match : {
                    user : new Types.ObjectId(_id)
                }
            },
            {
                $lookup : {
                    from : 'building_datas',
                    localField : 'building',
                    foreignField : '_id',
                    as : 'building'
                }
            },
            {
                $unwind : {
                    path : '$building'
                }
            },
            {
                $match : {
                    "building.name" : 'Market'
                }
            }
        ]))[0]

        if(!marketBuilding) return res.send({status : 100})

        const marchings = await Marchings.find({user : _id , type : {$in : [3,4]} , status : {$ne : 2}})

        let marketCargo = marketBuilding.value
        
        marchings.forEach(marching => {
            for (const key in marching.cargo) {
                if (Object.prototype.hasOwnProperty.call(marching.cargo, key)) {
                    const value = marching.cargo[key];
                    marketCargo -= value
                }
            }
        })

        const markets = await Markets.find({user : _id , status : {$ne : 2}})

        markets.forEach(market => {
            for (const key in market.offer) {
                if (Object.prototype.hasOwnProperty.call(market.offer, key)) {
                    const value = market.offer[key];
                    marketCargo -= value
                }
            }
        })

        if(totalOffer > marketCargo) return res.send({status : 101})

        await Markets.create({
            user : _id,
            clan : user.clan,
            offer : offer,
            receive : receive,
            status : 0,
            endAt : Date.now() + 12 * 60 * 60 * 1000, //end after 12h
        })
        res.send({status : 1})
    }
}

export default marketController