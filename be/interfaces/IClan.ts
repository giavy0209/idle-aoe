import { Types } from "mongoose";
import { IUsers } from ".";

interface Iuser extends Types.ObjectId , IUsers{}
export default interface IClan {
    owner : Iuser,
    
}