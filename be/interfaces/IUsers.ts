import { Types } from "mongoose";
import {IClan, IWorlds} from ".";

interface Iworld extends IWorlds , Types.ObjectId {}

export default interface IUser {
    username : string,
    password : string,
    name : string,
    world : Iworld,
    lastLogin : Date | number,
    population : number,
    exp : number,
    clan : Types.ObjectId,
    lastOnline : Date | number,
    sockets : string[]
}