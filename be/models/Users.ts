import {model, Schema, Types} from 'mongoose'
import { IUsers } from 'interfaces'
import Castles from './Castles'
import Resources from './Resources'
import Buildings from './Buildings'
import Units from './Units'

const UserSchema = new Schema<IUsers>({
    username : {type : String, required : true},
    password : {type : String, required : true},
    name : {type : String, default : ''},
    lastLogin : {type : Date},
    world : {type : Schema.Types.ObjectId , ref : 'worlds'},
    exp : {type : Number, default : 0},
    clan : {type : Schema.Types.ObjectId , ref : 'clans'},
    population : {type : Number, default : 0},
    lastOnline : {type : Date},
    sockets : [{type : String, default : []}]
}, {
    timestamps : true,
})

const Users = model<IUsers>('users' , UserSchema)
export default Users