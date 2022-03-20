import {Request,Response} from "express";
import {BuildingDatas, Buildings, ResourceDatas, Resources, Users,Units,UnitDatas} from 'models'
import {compareSync, hashSync} from 'bcrypt'
import { sign } from 'jsonwebtoken'
class authController {
    static async auth (req : Request , res : Response) {
        const {username, password} = req.body
        if(!username || !password) return res.send({status : 100})
        const user = await Users.findOne({username})
        if(!user) return res.send({status : 101})
        const compare = compareSync(password, user.password)
        if(!compare) return res.send({status : 102})
        const token = sign({_id : user._id} , global.Config.JWT)
        res.send({
            status : 1,
            token
        })
        user.lastLogin = Date.now()
        await user.save()
    }
    static async signup (req : Request , res : Response) {
        let {username , password} = req.body
        username = username.trim()
        password = password.trim()
        if(!username || !password) return res.send({status : 100})
        const isExits = await Users.findOne({username})
        if(isExits) return res.send({status : 100})
        const hash_password = hashSync(password, 5);
        const user = await Users.create({
            username , 
            password : hash_password
        })
        const buildings = await BuildingDatas.find({})
        for (let index = 0; index < buildings.length; index++) {
            const building = buildings[index];
            await Buildings.create({
                building : building._id,
                user : user._id,
                value : building.upgrade[0].generate,
                resource : building.resource,
            })
        }

        const resources = await ResourceDatas.find({})
        for (let index = 0; index < resources.length; index++) {
            const resource = resources[index];
            await Resources.create({
                user : user._id,
                type : resource._id,
            })
        }

        const units = await UnitDatas.find({})
        for (let index = 0; index < units.length; index++) {
            const unit = units[index];
            await Units.create({
                user : user._id,
                unit : unit._id,
            })
        }
        res.send({status : 1})
    }
}

export default authController