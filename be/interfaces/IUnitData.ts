import { Types } from "mongoose";
import {IBuildingData} from ".";
interface IbuildingData extends IBuildingData , Types.ObjectId {}
export default interface IUnitData {
    name : string,
    time : number,
    speed : number,
    cargo : number,
    life : number,
    range : number,
    building : IbuildingData
    resource : {
        gold : number,
        iron : number,
        wood : number,
        food : number,
    },
    strength : {
        barrack : number,
        archer : number,
        stable : number,
        workshop : number,
    },

}