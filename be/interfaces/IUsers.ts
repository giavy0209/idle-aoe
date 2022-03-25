import { Types } from "mongoose";
import {IWorlds} from ".";

interface Iworld extends IWorlds , Types.ObjectId {}
export default interface IUser {
    username : string,
    password : string,
    name : string,
    world : Iworld,
    lastLogin : Date | number,
}