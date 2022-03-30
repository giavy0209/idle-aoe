import { Types } from "mongoose";
import {IResourceData} from ".";
interface Iresource extends Types.ObjectId , IResourceData{}
export default interface IBuildingData {
    name : string,
    description : string,
    resource : Iresource,
    order : number,
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