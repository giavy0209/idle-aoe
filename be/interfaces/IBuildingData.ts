import { Types } from "mongoose";
import {IResource} from ".";
interface Iresource extends Types.ObjectId , IResource{}
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