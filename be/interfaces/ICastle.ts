import { Types } from "mongoose";
import { } from ".";
export default interface ICastle{
    user : Types.ObjectId,
    loyal : number,
    population : number,
    world : Types.ObjectId,
    clan : Types.ObjectId,
    name : string
}