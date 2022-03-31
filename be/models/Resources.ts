import {model, Schema, Types} from 'mongoose'
import { IResource } from '../interfaces'

const ResourceSchema = new Schema<IResource>({
    user : {type : Schema.Types.ObjectId, ref : 'users'},
    type : {type: Schema.Types.ObjectId , ref : 'resource_datas'},
    building : {type : Schema.Types.ObjectId , ref : 'buildings'},
    lastUpdate : {type : Date , default : Date.now},
    value : {type : Number, default : 500},
    inMarket : {type : Number, default : 0}
})

const Resources = model<IResource>('resources' , ResourceSchema)
Resources.updateMany({} , {inMarket : 0})
.then(res => {
    console.log(res);
    
})
export default Resources