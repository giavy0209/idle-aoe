import { Response } from "express";
import { Buildings, Users } from 'models'
import { IRequest } from "interfaces";
import { Types } from "mongoose";
class enemyController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        const {search} = req.query

        const user = await Users.findById(_id)
        if(!user) return res.send({status : 100})

        const query : {
            [key : string] : any
        }= {
            _id : {$ne : new Types.ObjectId(_id)},
            world : user.world,
            username : {$regex : new RegExp(`${search}` , 'i')}
        }
        if(user.clan) {
            query.clan = {$ne : user.clan}
        }
        const data = await Users.aggregate([
            {
                $match: query
            },
            {
                $sample: { size: 10 }
            }
        ])
        res.send({ status: 1, data })
    }
    
}

export default enemyController