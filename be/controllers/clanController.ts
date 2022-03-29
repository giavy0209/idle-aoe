import { query, Response } from "express";
import { Clans, Users } from 'models'
import { IRequest } from "interfaces";
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

        const total = await Clans.countDocuments(query)

        res.send({ status: 1, data, total })
    }
    static async post(req: IRequest, res: Response) {
        const { _id } = req
        const { name, description,website } = req.body

        const user = await Users.findById(_id)
        if (!user) return res.send({ status: 100 })

        if (user.clan) return res.send({ status: 100 })

        const isHave = await Clans.exists({ name })
        if (isHave) return res.send({ status: 101 })

        const clan = await Clans.create({
            name,
            description,
            website
        })
    }
}

export default clanController