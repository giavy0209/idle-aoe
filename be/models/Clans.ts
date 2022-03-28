import {model, Schema, Types} from 'mongoose'
import { IResource } from '../interfaces'

const ClanSchema = new Schema<IResource>({
    user : {type : Schema.Types.ObjectId, ref : 'users'},
    type : {type: Schema.Types.ObjectId , ref : 'resource_datas'},
    building : {type : Schema.Types.ObjectId , ref : 'buildings'},
    lastUpdate : {type : Date , default : Date.now},
    value : {type : Number, default : 500},
})

const Clans = model<IResource>('clans' , ClanSchema)

export default Clans