import {  Response } from "express";
import { Clans, Users } from 'models'
import { IRequest } from "interfaces";
import { Types } from "mongoose";
class clanController {
    static async get(req: IRequest, res: Response) {
        const { page, name } = req.query
        const skip = Number(page) - 1 * 10 || 0
        const query: { name?: any } = {}
        if (name) {
            query.name = name
        }
        const data = await Clans.find(query)
            .limit(10)
            .skip(skip)
            .sort({ exp: -1 })
            .populate('owner')

        const total = await Clans.countDocuments(query)

        res.send({ status: 1, data, total })
    }
    static async post(req: IRequest, res: Response) {
        const { _id } = req
        let { name, description, website, minPopulation } = req.body
        name = name.trim()
        if(name.length < 4 || name.length > 20) return res.send({status : 101})
        description = description.trim()
        website = website.trim()
        minPopulation = Number(minPopulation) || 0
        minPopulation = minPopulation < 50000 && minPopulation > 0 ? minPopulation : 0

        const user = await Users.findById(_id)

        if (!user) return res.send({ status: 100 })

        if (user.clan) return res.send({ status: 100 })

        const isHave = await Clans.findOne({ name })
        if (isHave) return res.send({ status: 102 })
        const clan = await Clans.create({
            name,
            description,
            website,
            minPopulation,
            owner: _id,
        })
        user.clan = clan._id
        await user.save()
        res.send({status : 1})
    }

    static async getDetail(req: IRequest, res: Response) {
        const clanID = req.params.id
        const clanDetail = await Clans.aggregate([
            {
                $match : {
                    _id : new Types.ObjectId(clanID)
                }
            },
            {
                $lookup : {
                    from : 'users',
                    localField : '_id',
                    foreignField : "clan",
                    as : 'users'
                }
            },
            {
                $lookup : {
                    from : 'users',
                    localField : 'owner',
                    foreignField : '_id',
                    as : 'owner'
                }
            },
            {
                $unwind : {
                    path : "$owner"
                }
            }
        ])
        if(!clanDetail.length) return res.send({status : 100})
        return res.send({status : 1 , data : clanDetail})
    }
}

export default clanController