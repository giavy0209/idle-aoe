import { Types } from "mongoose";
import { IUsers,IUnitData} from ".";

interface Iuser extends Types.ObjectId , IUsers{}
interface Iunit extends IUnitData, Types.ObjectId {}
export default interface ITranning {
    user : Iuser,
    total : number,
    unit : Iunit,
    lastUpdate : Date | number,
    finishAt : Date | number,
    time : number
}