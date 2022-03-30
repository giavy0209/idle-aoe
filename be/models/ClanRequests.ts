import {model, Schema} from 'mongoose'
import { IClanRequest } from 'interfaces'

const ClanRequestSchema = new Schema<IClanRequest>({
    user : {type : Schema.Types.ObjectId, ref : 'users'},
    clan : {type : Schema.Types.ObjectId, ref : 'clans'},
},{
    timestamps : true,
})

const ClanRequests = model<IClanRequest>('clan_requests' , ClanRequestSchema)

export default ClanRequests