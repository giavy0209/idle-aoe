import {model, Schema, Types} from 'mongoose'
import { IBuildingData } from '../interfaces'

const BuildingDataSchema = new Schema<IBuildingData>({
    name : {type : String},
    upgrade : [{
        gold : Number,
        iron : Number,
        wood : Number,
        food : Number,
        level : Number,
        time : Number,
        generate : Number
    }],
})

const BuildingDatas = model<IBuildingData>('building_datas' , BuildingDataSchema)

export default BuildingDatas