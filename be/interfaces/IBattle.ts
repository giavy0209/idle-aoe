import { Types,Document } from 'mongoose'
import { IUsers, IBattleRound ,IUnitData,IBuildingData} from '.'
interface Iuser extends IUsers, Types.ObjectId { }
interface Iunit extends Types.ObjectId, IUnitData {}
interface IbattleRound extends IBattleRound, Types.ObjectId { }
interface Ibuilding extends Types.ObjectId , IBuildingData{}
interface IUnitsArray {
    unit : Iunit,
    total : number
}
interface ISpy {
    resources : {
        gold : number,
        iron : number,
        wood : number,
        food : number
    },
    units : {
        unit : Iunit,
        total : number
    }[],
    buildings : {
        building : Ibuilding,
        level : number
    }[],
    quickWalkerLost : number
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
    attackerDead : IUnitData[],
    defenderDead : IUnitData[],
    attackerExp : number,
    defenderExp : number
    spy : ISpy
}