import {model, Schema} from 'mongoose'
import { IClan } from 'interfaces'

const ClanSchema = new Schema<IClan>({
    owner : {type : Schema.Types.ObjectId , ref : 'users'},
    world : {type : Schema.Types.ObjectId , ref : 'worlds'},
    exp : {type : Number, default : 0},
    name : {type : String, default : ''},
    description : {type : String, default : ''},
    website : {type : String, default : ''},
    members : {type : Number, default : 1},
    minPopulation : {type : Number, default : 0},
},{
    timestamps : true,
})

const Clans = model<IClan>('clans' , ClanSchema)
export default Clans