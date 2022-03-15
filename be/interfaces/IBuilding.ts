import { Types } from "mongoose";
import { IUsers,IBuildingData } from ".";
interface Ibuilding extends Types.ObjectId , IBuildingData{}
export default interface IBuilding{
    user : IUsers,
    building : Ibuilding,
    level : number,
    isUpgrade : boolean,
    value : number,
    finishAt : number | Date
}