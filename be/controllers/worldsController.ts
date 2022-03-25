import {Response} from "express";
import {Worlds} from 'models'
import { IRequest } from "interfaces";
class worldsController {
    static async get (req : IRequest , res : Response) {
        const data = await Worlds.find({})
        res.send({status : 1, data})
    }
}

export default worldsController