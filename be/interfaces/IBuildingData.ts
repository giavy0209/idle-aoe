import { Types } from "mongoose";
import {IResourceData} from ".";
interface Iresource extends Types.ObjectId , IResourceData{}
export default interface IBuildingData {
    name : string,
    resource : Iresource,
    upgrade : {
        gold : number,
        iron : number,
        wood : number,
        food : number,
        level : number,
        time : number,
        generate : number,
        [key : string]: any,
    }[],
}