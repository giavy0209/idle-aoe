import { Types } from "mongoose";
import { IUsers, IClan } from ".";

interface Iuser extends Types.ObjectId , IUsers{}
interface IclanRequest extends Types.ObjectId , IClan{}
export default interface IClanRequest {
    user : Iuser,
    clan : IclanRequest,
}