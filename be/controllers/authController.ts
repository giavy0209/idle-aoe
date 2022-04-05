import { Request, Response } from "express";
import { BuildingDatas, Buildings, ResourceDatas, Resources, Users, Units, UnitDatas, Worlds, Castles } from 'models'
import { compareSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { isValidObjectId } from "mongoose";
import { IRequest } from "interfaces";
import { castleService } from "services";
class authController {
    static async auth(req: Request, res: Response) {
        let { username, password, world } = req.body
        username = username.trim()
        password = password.trim()
        if (!isValidObjectId(world)) return res.send({ status: 100 })
        if (!username || !password) return res.send({ status: 100 })
        const user = await Users.findOne({ username, world })
        if (!user) return res.send({ status: 101 })
        const compare = compareSync(password, user.password)
        if (!compare) return res.send({ status: 102 })
        const token = sign({ _id: user._id }, global.Config.JWT)
        res.send({
            status: 1,
            token
        })
        user.lastLogin = Date.now()
        await user.save()
    }
    static async signup(req: Request, res: Response) {
        let { username, password, world } = req.body
        username = username.trim()
        password = password.trim()
        if (!isValidObjectId(world)) return res?.send({ status: 100 })
        if (!username || !password) return res?.send({ status: 100 })

        const findWorld = await Worlds.findById(world)
        if (!findWorld) return res?.send({ status: 100 })

        const isExits = await Users.findOne({ username, world })
        if (isExits) return res?.send({ status: 100 })

        const hash_password = hashSync(password, 5);
        const user = await Users.create({
            username,
            password: hash_password,
            world
        })

        await castleService.create({ user: user._id, isCapital: true, isGhost: false, name: 'Capital' })
        res.send({ status: 1 })
    }

    static async isValidJWT(req: IRequest, res: Response) {
        const { _id } = req
        const user = await Users.findById(_id)
        if (!user) return res.send({ status: 0 })
        res.send({ status: 1 })
    }
}

export default authController