import { ITranning } from 'interfaces'
import {model, Schema, Types} from 'mongoose'

const Tranningchema = new Schema<ITranning>({
    user : {type : Schema.Types.ObjectId , ref : 'users'},
    unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
    userUnit : {type : Schema.Types.ObjectId , ref : 'units'},
    building : {type : Schema.Types.ObjectId, ref : 'building_dataas'},
    userBuilding : {type : Schema.Types.ObjectId , ref : 'buildings'},
    castle : {type : Schema.Types.ObjectId , ref : 'castles'},
    total : {type : Number},
    lastUpdate : {type : Date , default : Date.now},
    finishAt : {type : Date , default : Date.now},
    time : {type : Number},

})

const Trainnings = model<ITranning>('trainnings' , Tranningchema)

export default Trainnings