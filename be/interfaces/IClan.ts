import { Types } from "mongoose";
import { IUsers,IWorlds } from ".";

interface Iuser extends Types.ObjectId , IUsers{}
interface Iworld extends Types.ObjectId , IWorlds{}
export default interface IClan {
    owner : Iuser,
    world : Iworld
    exp : number,
    members : number,
    name : string,
    description : string,
    website : string,
    minPopulation : number,
    createdAt : Date | number,
    updatedAt : Date | number,
}