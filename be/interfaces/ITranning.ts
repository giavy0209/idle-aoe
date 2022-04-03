import { Types } from "mongoose";
import { IUsers,IUnitData,IBuilding,IBuildingData,IUnit} from ".";

interface Iuser extends Types.ObjectId , IUsers{}
interface Iunit extends IUnitData, Types.ObjectId {}
interface IUserUnit extends IUnit, Types.ObjectId {}
interface Ibuilding extends IBuildingData, Types.ObjectId {}
interface IUserBuilding extends IBuilding, Types.ObjectId {}
export default interface ITranning {
    user : Iuser,
    total : number,
    unit : Iunit,
    userUnit : IUserUnit,
    building : Ibuilding,
    userBuilding : IUserBuilding,
    lastUpdate : Date | number,
    finishAt : Date | number,
    time : number,
    castle : Types.ObjectId
}