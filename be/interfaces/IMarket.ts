import { Types } from "mongoose";

interface IOffer {
    gold ? : number,
    iron ? : number,
    wood ? : number,
    food ? : number,
    [key : string] : any
}

export default interface IMarket {
    user : Types.ObjectId,
    clan : Types.ObjectId,
    offer : IOffer,
    receive : IOffer,
    createdAt : Date | number,
    endAt : Date | number,
    status : number
}