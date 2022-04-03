import { Types } from "mongoose";
import { IUsers,IBuildingData,IResource } from ".";
interface Ibuilding extends Types.ObjectId , IBuildingData{}
interface Iuser extends Types.ObjectId , IUsers{}
interface Iresource extends Types.ObjectId , IResource{}
export default interface IBuilding{
    user : Iuser,
    building : Ibuilding,
    resource : Iresource,
    level : number,
    isUpgrade : boolean,
    value : number,
    finishAt : number | Date
    castle : Types.ObjectId
}