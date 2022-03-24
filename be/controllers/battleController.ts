import { Response } from "express";
import { Battles } from 'models'
import { IRequest } from "interfaces";
class battleController {
    static async get(req: IRequest, res: Response) {
        const { _id } = req
        const data = await Battles.find({ $or: [
            { attacker: _id }, 
            { defender: _id }
        ] })
            .populate('marching attacker defender attackerUnits.unit defenderUnits.unit winner')
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
        res.send({ status: 1, data })
    }
}

export default battleController