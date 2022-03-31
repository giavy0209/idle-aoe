import {model, Schema} from 'mongoose'
import { IMarket } from 'interfaces'
const MarketSchema = new Schema<IMarket>({
    user : {type : Schema.Types.ObjectId, ref : 'users'},
    clan : {type : Schema.Types.ObjectId, ref : 'clans'},
    offer : {
        gold : {type : Number},
        iron : {type : Number},
        wood : {type : Number},
        food : {type : Number},
    },
    receive : {
        gold : {type : Number},
        iron : {type : Number},
        wood : {type : Number},
        food : {type : Number},
    },
    endAt : {type : Date},
    status : {type : Number}, //0 : offering, 1 : moving, 2 : done
}, {
    timestamps : true
})

const Markets = model('markets' , MarketSchema)

export default Markets