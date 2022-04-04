import {model, Schema, Types} from 'mongoose'
import { ICastle } from '../interfaces'

const CastleSchema = new Schema<ICastle>({
    user : {type : Schema.Types.ObjectId , ref : "users"},
    loyal : {type : Number ,default : 10000},
    population : {type : Number, default : 0},
    world : {type : Schema.Types.ObjectId , ref : 'worlds'},
    clan : {type : Schema.Types.ObjectId, ref : 'clans'},
    name : {type : String, default : 'Capital'},
    isCapital : {type : Boolean, default : true},
    lastUpdate : {type : Date, default : Date.now}
})

const Castles = model<ICastle>('castles' , CastleSchema)
Castles.updateMany({}, {lastUpdate : Date.now()})
.then(console.log)
export default Castles