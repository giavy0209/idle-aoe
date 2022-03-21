import { Response } from "express";
import { Buildings, Users } from 'models'
import { IRequest } from "interfaces";
import { Types } from "mongoose";
class enemyController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        const data = await Users.aggregate([
            {
                $match: {
                    _id: { $nin: [new Types.ObjectId(_id)] }
                }
            },
            {
                $sample: { size: 10 }
            }
        ])
        res.send({ status: 1, data })
    }
    
}

export default enemyController