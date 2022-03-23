import { Types } from 'mongoose'
import {IUsers, IUnitData,IBattleRound} from '.'
interface Iuser extends IUsers , Types.ObjectId{}

interface Iunit extends Types.ObjectId, IUnitData {}
interface IbattleRound extends IBattleRound , Types.ObjectId{}

interface IUnitAttack {
    user : Iuser,
    unit : Iunit,
    total : number,
    damage : number,
}

interface IUnitDefend {
    user : Iuser,
    unit : Iunit,
    totalHit : number,
}

export default interface IBattleAction {
    type : number,
    battleRound : IbattleRound,
    unitAttack : IUnitAttack,
    unitDefend : IUnitDefend,
}