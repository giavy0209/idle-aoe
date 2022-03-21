import { Types } from "mongoose";
import { IUsers,IUnitData } from ".";
import IUnit from "./IUnit";

interface Iunit extends Types.ObjectId, IUnitData {}
interface Iuser extends Types.ObjectId , IUsers{}

interface IUnitsArray {
    unit : Iunit,
    total : number
}
interface ICargo {
    gold : number,
    iron : number,
    wood : number,
    food : number,
    [key : string]: any,
}
export default interface IMarching{
    units : IUnitsArray[],
    cargo : ICargo,
    target : Iuser,
    user : Iuser,
    unitSpeed : number,
    movingSpeed : number,
    startTime : Date | number,
    arriveTime : Date | number,
    homeTime : Date | number,
    type : number,
    status : number
}