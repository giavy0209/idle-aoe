import { Types } from "mongoose";
import { IUsers ,IResourceData} from ".";
interface IType extends Types.ObjectId , IResourceData{}
interface IUser extends Types.ObjectId , IUsers{}
export default interface IResource  {
    user : IUser,
    type : IType,
    value : number,
    lastUpdate : number | Date,
    
}