import {model, Schema, Types} from 'mongoose'
import { IResource } from '../interfaces'

const ResourceSchema = new Schema<IResource>({
    user : {type : Schema.Types.ObjectId, ref : 'users'},
    type : {type: Schema.Types.ObjectId , ref : 'resource_datas'},
    lastUpdate : {type : Date , default : Date.now},
    value : {type : Number, default : 500}
})

const Resources = model<IResource>('resources' , ResourceSchema)

export default Resources