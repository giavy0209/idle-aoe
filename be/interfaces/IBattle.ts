import { Types,Document } from 'mongoose'
import { IUsers, IBattleRound } from '.'
interface Iuser extends IUsers, Types.ObjectId { }
interface IbattleRound extends IBattleRound, Types.ObjectId { }
export default interface IBattle {
    attacker: Iuser,
    defender: Iuser,
    marching: Document<unknown, any, IBattleRound> & IBattleRound & {
        _id: Types.ObjectId;
    },
    rounds: Document<unknown, any, IBattleRound> & IBattleRound & {
        _id: Types.ObjectId;
    }[]
}