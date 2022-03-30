import {Request,Response} from "express";
import {BuildingDatas, Buildings, ResourceDatas, Resources, Users,Units,UnitDatas, Worlds} from 'models'
import {compareSync, hashSync} from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { isValidObjectId } from "mongoose";
import { IRequest } from "interfaces";
class authController {
    static async auth (req : Request , res : Response) {
        let {username, password, world} = req.body
        username = username.trim()
        password = password.trim()
        if(!isValidObjectId(world)) return res.send({status : 100})
        if(!username || !password) return res.send({status : 100})
        const user = await Users.findOne({username, world})
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
    static async signup (req : Request | {[key : string] : any} , res : Response | null) {
        let {username , password, world} = req.body
        username = username.trim()
        password = password.trim()
        if(!isValidObjectId(world)) return res?.send({status : 100})
        if(!username || !password) return res?.send({status : 100})

        const findWorld = await Worlds.findById(world)
        if(!findWorld) return res?.send({status : 100})

        const isExits = await Users.findOne({username , world})
        if(isExits) return res?.send({status : 100})

        const hash_password = hashSync(password, 5);
        const user = await Users.create({
            username , 
            password : hash_password,
            world
        })

        const buildings = await BuildingDatas.find({})
        for (let index = 0; index < buildings.length; index++) {
            const building = buildings[index];
            const userBuilding = await Buildings.create({
                building : building._id,
                user : user._id,
                value : building.upgrade[0].generate,
                resource : building.resource,
            })
            if(building.resource) {
                await Resources.create({
                    user : user._id,
                    type : building.resource,
                    building : userBuilding._id
                })
            }
        }

        const units = await UnitDatas.find({})
        for (let index = 0; index < units.length; index++) {
            const unit = units[index];
            await Units.create({
                user : user._id,
                unit : unit._id,
            })
        }

        if(res) {
            res.send({status : 1})
        
        }
    }

    static async isValidJWT(req : IRequest, res : Response) {
        const {_id} = req
        const user = await Users.findById(_id)
        if(!user) return res.send({status : 0})
        res.send({status : 1})
    }

    static async create() {
        const users = await Users.find({})
        const buildingDatas = await BuildingDatas.find({})
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            for (let j = 0; j < buildingDatas.length; j++) {
                const buildingData = buildingDatas[j];
                const building = await Buildings.findOne({building : buildingData._id, user : user._id})
                if(!building) {
                    await Buildings.create({
                        building : buildingData._id,
                        user : user._id,
                        value : buildingData.upgrade[0].generate,
                    })
                }
                
            }
        }
    }
}

export default authController