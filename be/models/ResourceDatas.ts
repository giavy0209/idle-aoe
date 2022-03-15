import {model, Schema, Types} from 'mongoose'
import { IResourceData } from '../interfaces'

const ResourceDataSchema = new Schema<IResourceData>({
    name : {type : String},
})

const ResourceDatas = model<IResourceData>('resource_datas' , ResourceDataSchema)

export default ResourceDatas