import { Types,Document } from "mongoose";
import {IBattleAction, IBattle,} from '.'

interface IbattleAction extends IBattleAction , Types.ObjectId {}
interface Ibattle extends IBattle , Types.ObjectId {}
export default interface IBattleRound {
    name : string,
    battle : Ibattle | Types.ObjectId
    actions : Document<unknown, any, IBattleAction> & IBattleAction & {
        _id: Types.ObjectId;
    }[]
}