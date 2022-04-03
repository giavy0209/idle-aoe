import {model, Schema, Types} from 'mongoose'
import { IBuilding } from '../interfaces'

const BuildingSchema = new Schema<IBuilding>({
    user : {type : Schema.Types.ObjectId  ,ref : 'users'},
    building : {type : Schema.Types.ObjectId , ref : 'building_datas'},
    level : {type : Number , default : 0},
    value : {type : Number , default : 0},
    resource : {type : Schema.Types.ObjectId , ref : 'resources'},
    isUpgrade : {type : Boolean, default : false},
    finishAt : {type : Date},
    castle : {type : Schema.Types.ObjectId , ref : 'castle'}
})

const Buildings = model<IBuilding>('buildings' , BuildingSchema)

export default Buildings