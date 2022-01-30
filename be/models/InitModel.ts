import {model, Schema, Types} from 'mongoose'

const InitSchema = new Schema({
    field1 : {type : String, required: true , index : true , unique : true},
    field2 : {type : Number, required : true , min : 0 , max : 10},
    field3 : {type : Boolean , default : false },
    field4 : {type : Types.ObjectId , ref : 'inits'},
    field5 : {
        subfield1 : {type : String, required: true , index : true , unique : true},
        subfield2 : {type : Number, required : true , min : 0 , max : 10},
        subfield3 : {type : Boolean , default : false },
        subfield4 : {type : Types.ObjectId , ref : 'inits'},
        subfield5 : {type : [Types.ObjectId] , ref : 'init'}
    }
})

const Inits = model('inits' , InitSchema)