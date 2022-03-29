import { Types } from "mongoose";
import { IUsers } from ".";

interface Iuser extends Types.ObjectId , IUsers{}
export default interface IClan {
    owner : Iuser,
    exp : number,
    createdAt : Date | number,
    updatedAt : Date | number,
    members : number,
    name : string,
    description : string
}