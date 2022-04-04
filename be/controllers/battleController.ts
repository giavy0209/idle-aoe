import { Response } from "express";
import { Battles } from 'models'
import { IRequest } from "interfaces";
class battleController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        let {page} = req.query
        const skip = (Number(page) - 1) * 10 || 0
        const query = { $or: [
            { attacker: _id }, 
            { defender: _id }
        ] }
        const data = await Battles.find(query)
            .populate('marching attacker defender attackerUnits.unit defenderUnits.unit attackerDead.unit defenderDead.unit winner attackerCastle defenderCastle')
            .populate({
                path: 'rounds',
                populate: {
                    path: "actions",
                    populate: {
                        path: "unitAttack.unit unitAttack.user unitDefend.unit unitDefend.user"
                    }
                }
            })
            .populate({
                path: 'spy.buildings',
                populate: {
                    path: "building"
                }
            })
            .populate({
                path: 'spy.units',
                populate: {
                    path: "unit"
                }
            })
            .sort({ _id: -1 })
            .limit(10)
            .skip(skip)

        const total = await Battles.countDocuments(query)

        res.send({ status: 1, data ,total})
    }
}

export default battleController