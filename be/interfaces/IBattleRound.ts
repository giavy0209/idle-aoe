import { Types, Document } from "mongoose";
import { IBattleAction, IBattle,IUnitData } from '.'

interface IbattleAction extends IBattleAction, Types.ObjectId { }
interface Ibattle extends IBattle, Types.ObjectId { }
interface Iunit extends Types.ObjectId, IUnitData {}
interface IUnitsArray {
    unit : Iunit,
    total : number
}
export default interface IBattleRound {
    name: string,
    battle: Ibattle | Types.ObjectId
    actions: Document<unknown, any, IBattleAction> & IBattleAction & {
        _id: Types.ObjectId;
    }[],
    attackerStartUnits : IUnitsArray[] 
    attackerEndUnits : IUnitsArray[]
    defenderStartUnits : IUnitsArray[]
    defenderEndUnits : IUnitsArray[]
    attackerDead : IUnitsArray[]
    defenderDead : IUnitsArray[]
}