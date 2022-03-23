import { Types,Document } from 'mongoose'
import { IUsers, IBattleRound ,IUnitData} from '.'
interface Iuser extends IUsers, Types.ObjectId { }
interface Iunit extends Types.ObjectId, IUnitData {}
interface IbattleRound extends IBattleRound, Types.ObjectId { }
interface IUnitsArray {
    unit : Iunit,
    total : number
}
export default interface IBattle {
    attacker: Iuser,
    defender: Iuser,
    winner : Iuser,
    marching: Document<unknown, any, IBattleRound> & IBattleRound & {
        _id: Types.ObjectId;
    },
    rounds: Document<unknown, any, IBattleRound> & IBattleRound & {
        _id: Types.ObjectId;
    }[],
    attackerUnits : IUnitsArray[],
    defenderUnits : IUnitsArray[],
}