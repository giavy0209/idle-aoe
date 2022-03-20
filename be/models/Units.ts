import { IUnit } from 'interfaces'
import {model, Schema, Types} from 'mongoose'

const UnitSchema = new Schema<IUnit>({
    user : {type : Schema.Types.ObjectId , ref : 'users'},
    unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
    total : {type : Number, default : 0},
})

const Units = model<IUnit>('units' , UnitSchema)

export default Units