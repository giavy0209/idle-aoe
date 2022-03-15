import { Types } from "mongoose";

export default interface IBuilding{
    user : Types.ObjectId,
    building : Types.ObjectId,
    level : number,
    isUpgrade : boolean,
    value : number,
    finishAt : number | Date
}