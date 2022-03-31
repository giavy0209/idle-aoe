import {model, Schema, Types} from 'mongoose'
import { IMarching } from '../interfaces'

const MarchingSchema = new Schema<IMarching>({
    units : [{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }],
    cargo : {
        gold : {type : Number , default : 0},
        iron : {type : Number , default : 0},
        wood : {type : Number , default : 0},
        food : {type : Number , default : 0}
    },
    user : {type : Schema.Types.ObjectId , ref : 'users'},
    target : {type : Schema.Types.ObjectId , ref : 'users'},
    type : {type : Number}, //1 : attack , 2 : spy , 3 : trade , 4 : caravan , 5 : patrol , 6...
    unitSpeed : {type : Number},
    movingSpeed : {type : Number},
    startTime : {type : Date , default : Date.now},
    arriveTime : {type : Date},
    homeTime : {type : Date},
    status : {type : Number , default : 0} // 0 : just send, 1 : arrive, 2 : home, 3 : dead all
})

const Marchings = model<IMarching>('marchings' , MarchingSchema)

export default Marchings