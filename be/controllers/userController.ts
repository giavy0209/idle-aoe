import {Response} from "express";
import {Users} from 'models'
import {compareSync, hashSync} from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { IRequest } from "interfaces";
class userController {
    static async get (req : IRequest , res : Response) {
        const {_id} = req
        const data = await Users.findById(_id)
        .populate('world')
        
        res.send({status : 1 , data})
    }
}

export default userController