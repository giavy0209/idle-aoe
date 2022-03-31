import { Types } from "mongoose";
import { IUsers ,IResourceData,IBuilding} from ".";
interface IType extends Types.ObjectId , IResourceData{}
interface IUser extends Types.ObjectId , IUsers{}
interface Ibuilding extends Types.ObjectId , IBuilding{}
export default interface IResource  {
    user : IUser,
    type : IType,
    value : number,
    lastUpdate : number | Date,
    building : Ibuilding,
    inMarket : number
}