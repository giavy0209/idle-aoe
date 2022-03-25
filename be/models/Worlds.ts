import {model, Schema, Types} from 'mongoose'
import { IWorlds } from 'interfaces'

const WorldSchema = new Schema<IWorlds>({
    name : {type : String},
    speed : {type : Number},
    startDate : {type : Date , default : Date.now},
    endDate : {type: Date, default : Date.now}
})

const Worlds = model<IWorlds>('worlds' , WorldSchema)
// Worlds.create({
//     name : "World 1",
//     speed : 1,
//     endDate : new Date('2022-04-25T00:00:00.000+00:00')
// })
export default Worlds