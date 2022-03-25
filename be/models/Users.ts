import {model, Schema, Types} from 'mongoose'
import { IUsers } from 'interfaces'

const UserSchema = new Schema<IUsers>({
    username : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    name : {type : String, default : ''},
    lastLogin : {type : Date},
    world : {type : Schema.Types.ObjectId , ref : 'worlds'}
}, {
    timestamps : true,
})

const Users = model<IUsers>('users' , UserSchema)

export default Users