import { Types } from "mongoose";
import { IUsers,IBuildingData } from ".";
interface Ibuilding extends Types.ObjectId , IBuildingData{}
interface Iuser extends Types.ObjectId , IUsers{}
export default interface IBuilding{
    user : Iuser,
    building : Ibuilding,
    level : number,
    isUpgrade : boolean,
    value : number,
    finishAt : number | Date
}