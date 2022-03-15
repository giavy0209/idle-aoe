import {model, Schema, Types} from 'mongoose'
import { IBuilding } from '../interfaces'

const BuildingSchema = new Schema<IBuilding>({
    user : {type : Types.ObjectId  ,ref : 'users'},
    building : {type : Types.ObjectId , ref : 'building_datas'},
    level : {type : Number , default : 0},
    value : {type : Number , default : 0},
    isUpgrade : {type : Boolean, default : false},
    finishAt : {type : Date},
})

const Buildings = model<IBuilding>('buildings' , BuildingSchema)

export default Buildings