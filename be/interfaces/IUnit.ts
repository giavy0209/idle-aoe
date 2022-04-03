import { Types } from "mongoose";
import {IUsers,IUnitData} from '.'
interface Iuser extends IUsers, Types.ObjectId {}
interface Iunit extends IUnitData, Types.ObjectId {}
export default interface IUnit {
    user : Iuser,
    unit : Iunit,
    total : number,
    inTower : number,
    castle : Types.ObjectId,
}