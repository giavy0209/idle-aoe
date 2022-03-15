import { Types } from "mongoose";

export default interface IResource  {
    user : Types.ObjectId,
    type : Types.ObjectId,
    value : number,
    lastUpdate : number | Date,
    
}