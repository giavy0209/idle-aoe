import { Response } from "express";
import { Castles, ClanRequests, Clans, Markets, Resources, Users } from 'models'
import { IRequest } from "interfaces";
import { Types } from "mongoose";
import { changeUser } from "wsServices";
import { CHANGE_RESOURCE } from "../worker/workerChangeResource";
class clanController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        const user = await Users.findById(_id)
        if (!user) return res.send({ status: 100 })
        const { page, name } = req.query
        const skip = Number(page) - 1 * 10 || 0
        const query: { name?: any, world: any } = { world: user.world }
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
        if (name.length < 4 || name.length > 20) return res.send({ status: 101 })
        description = description.trim()
        website = website.trim()
        minPopulation = Number(minPopulation) || 0
        minPopulation = minPopulation < 50000 && minPopulation > 0 ? minPopulation : 0

        const user = await Users.findById(_id)

        if (!user) return res.send({ status: 100 })

        if (user.clan) return res.send({ status: 100 })

        const isHave = await Clans.findOne({ name, world: user.world })
        if (isHave) return res.send({ status: 102 })
        const clan = await Clans.create({
            name,
            description,
            website,
            minPopulation,
            owner: _id,
            world : user.world
        })
        user.clan = clan._id
        await user.save()
        await ClanRequests.deleteMany({user : _id})
        res.send({ status: 1 })

        changeUser(_id)
    }

    static async delete(req: IRequest, res: Response) {
        const { _id } = req
        await Users.updateOne({ _id: new Types.ObjectId(_id) }, { $unset: { clan: 1 } })
        await Castles.updateMany({user : new Types.ObjectId(_id)} , { $unset: { clan: 1 } })
        const markets = await Markets.find({ user: _id, status: 0 })

        const recevieResource: {
            gold: number,
            iron: number,
            wood: number,
            food: number,
            [key: string]: any
        } = {
            gold: 0,
            iron: 0,
            wood: 0,
            food: 0
        }

        for (let index = 0; index < markets.length; index++) {
            const market = markets[index];
            market.status = 2
            await market.save()
            for (const key in market.offer) {
                if (Object.prototype.hasOwnProperty.call(market.offer, key)) {
                    const value = market.offer[key];
                    if(value) {
                      recevieResource[key] += value
                    }
                }
            }
        }

        res.send({ status: 1 })

        const userResource = await Resources.find({ user: _id })
            .populate('type')
        userResource.forEach(resource => {
            const resourceName = resource.type.name.toLowerCase()
            const value = recevieResource[resourceName]
            CHANGE_RESOURCE.push({
                resource: resource._id,
                newValue: value
            })
        })
        changeUser(_id)
    }

    static async getJoin(req: IRequest, res: Response) {
        const { _id } = req
        const clanID = req.params.id
        const user = await Users.findById(_id)
        if (!user) return res.send({ status: 100 })
        const clan = await Clans.findById(clanID)
        if (!clan || clan.owner.toString() !== user._id.toString()) return res.send({ status: 100 })

        const data = await ClanRequests.find({ clan: clanID })
            .populate('user')
        res.send({ status: 1, data })
    }

    static async postJoin(req: IRequest, res: Response) {
        const { _id } = req
        const clanID = req.params.id
        const user = await Users.findById(_id)
        if (!user) return res.send({ status: 100 })
        const clan = await Clans.findById(clanID)
        if (!clan) return res.send({ status: 100 })

        const isHave = await ClanRequests.exists({ user: _id, clan: clanID })
        if (isHave) return res.send({ status: 101 })

        await ClanRequests.create({
            clan: clanID,
            user: _id
        })
        res.send({ status: 1 })
    }

    static async putJoin(req: IRequest, res: Response) {
        const { _id } = req
        const requestID = req.params.id
        const request = await ClanRequests.findById(requestID)
        if (!request) return res.send({ status: 100 })

        const owner = await Users.findById(_id)
        if (!owner) return res.send({ status: 100 })

        const clan = await Clans.findById(request.clan)
        if (!clan || clan.owner.toString() !== owner._id.toString()) return res.send({ status: 100 })

        if (clan.members > 30) return res.send({ status: 101 })

        if (!request) return res.send({ status: 100 })

        const user = await Users.findById(request.user)
        if (!user) return res.send({ status: 100 })

        user.clan = clan._id
        await user.save()

        clan.members = await Users.countDocuments({ clan: clan._id })
        await clan.save()
        await ClanRequests.deleteMany({ user: request.user })

        res.send({ status: 1 })

        changeUser(user._id.toString())
    }

    static async deleteJoin(req: IRequest, res: Response) {
        const { _id } = req
        const requestID = req.params.id
        const request = await ClanRequests.findById(requestID)
        if (!request) return res.send({ status: 100 })

        const owner = await Users.findById(_id)
        if (!owner) return res.send({ status: 100 })

        const clan = await Clans.findById(request.clan)
        if (!clan || clan.owner.toString() !== owner._id.toString()) return res.send({ status: 100 })

        await request.delete()
        res.send({ status: 1 })
    }

    static async getDetail(req: IRequest, res: Response) {
        const clanID = req.params.id
        const clanDetail = await Clans.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(clanID)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: "clan",
                    as: 'users'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner'
                }
            },
            {
                $unwind: {
                    path: "$owner"
                }
            }
        ])
        if (!clanDetail.length) return res.send({ status: 100 })
        return res.send({ status: 1, data: clanDetail[0] })
    }

    static async patchDetail(req: IRequest, res: Response) {
        const { _id } = req
        const clanID = req.params.id
        let { description, website, minPopulation } = req.body
        description = description.trim()
        website = website.trim()
        minPopulation = Number(minPopulation) || 0
        minPopulation = minPopulation < 50000 && minPopulation > 0 ? minPopulation : 0
        const user = await Users.findById(_id)
        if (!user) return res.send({ status: 100 })
        const clan = await Clans.findById(clanID)
        if (!clan || clan.owner.toString() !== user._id.toString()) return res.send({ status: 100 })

        clan.description = description
        clan.website = website,
            clan.minPopulation = minPopulation
        await clan.save()
        res.send({ status: 1 })
    }

    static async deleteUser(req: IRequest, res: Response) {
        const { _id } = req
        const userId = req.params.id
        const owner = await Users.findById(_id)
        if (!owner) return res.send({ status: 100 })
        const clan = await Clans.findById(owner.clan)
        if (!clan || clan.owner.toString() !== owner._id.toString()) return res.send({ status: 100 })

        const user = await Users.findById(userId)
        if (!user) return res.send({ status: 100 })

        await Users.updateOne({ _id: user._id }, { $unset: { clan: 1 } })
        await Castles.updateMany({user : user._id} , { $unset: { clan: 1 } })
        clan.members = await Users.countDocuments({ clan: clan._id })
        await clan.save()
        res.send({ status: 1 })

        const markets = await Markets.find({ user: userId, status: 0 })

        const recevieResource: {
            gold: number,
            iron: number,
            wood: number,
            food: number,
            [key: string]: any
        } = {
            gold: 0,
            iron: 0,
            wood: 0,
            food: 0
        }

        for (let index = 0; index < markets.length; index++) {
            const market = markets[index];
            market.status = 2
            await market.save()
            for (const key in market.offer) {
                if (Object.prototype.hasOwnProperty.call(market.offer, key)) {
                    const value = market.offer[key];
                    if(value) {
                      recevieResource[key] += value
                    }
                }
            }
        }

        const userResource = await Resources.find({ user: userId })
        .populate('type')

        userResource.forEach(resource => {
            const resourceName = resource.type.name.toLowerCase()
            const value = recevieResource[resourceName]
            CHANGE_RESOURCE.push({
                resource: resource._id,
                newValue: value
            })
        })

        changeUser(userId)
    }
}

export default clanController