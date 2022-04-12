import { Types } from 'mongoose'
import {IUsers, IUnitData,IBattleRound} from '.'
interface Iuser extends IUsers , Types.ObjectId{}

interface Iunit extends Types.ObjectId, IUnitData {}
interface IbattleRound extends IBattleRound , Types.ObjectId{}

interface IUnitAttack {
    user : Iuser,
    castle : Types.ObjectId
    unit : Iunit,
    total : number,
    damage : number,
}

interface IUnitDefend {
    user : Iuser,
    castle : Types.ObjectId
    unit : Iunit,
    totalHit : number,
}

export default interface IBattleAction {
    type : number,
    battleRound : IbattleRound,
    unitAttack : IUnitAttack,
    unitDefend : IUnitDefend,
}