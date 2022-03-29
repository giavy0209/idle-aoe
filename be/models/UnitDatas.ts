import {model, Schema, Types} from 'mongoose'
import { IUnitData } from '../interfaces'

const UnitDataSchema = new Schema<IUnitData>({
    name : {type : String},
    time : Number,
    speed : Number,
    cargo : Number,
    life : Number,
    range : Number,
    building : {type : Schema.Types.ObjectId , ref : 'building_datas'},
    description : {type : String , default : ''},
    population : {type : Number},
    resource : {
        gold : Number,
        iron : Number,
        wood : Number,
        food : Number,
    },
    strength : {
        barrack : Number,
        archer : Number,
        stable : Number,
        workshop : Number,
    }
})

const UnitDatas = model<IUnitData>('unit_datas' , UnitDataSchema)

export default UnitDatas