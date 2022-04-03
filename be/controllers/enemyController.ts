import { Response } from "express";
import { Buildings, Castles, Users } from 'models'
import { IRequest } from "interfaces";
import { Types } from "mongoose";
class enemyController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        const { search } = req.query

        const user = await Users.findById(_id)
        if (!user) return res.send({ status: 100 })

        const query: {
            [key: string]: any
        } = {
            user: { $ne: new Types.ObjectId(_id) },
            world: user.world,
        }
        if (user.clan) {
            query.clan = { $ne: user.clan }
        }
        const data = await Castles.aggregate([
            {
                $match: query
            },
            {
                $lookup : {
                    from : 'users',
                    localField : 'user',
                    foreignField : '_id',
                    as : 'user'
                }
            },
            {
                $match : {
                    'user.username': { $regex: new RegExp(`${search}`, 'i') }
                }
            },
            {
                $unwind : {
                    path : "$user"
                }
            },
            {
                $sample : {size : 10}
            }
        ])

        res.send({ status: 1, data })
    }

}

export default enemyController