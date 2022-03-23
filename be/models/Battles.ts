import { model, Schema, Types } from 'mongoose'
import { IBattle } from 'interfaces'

const BattleSchema = new Schema<IBattle>({
    attacker: { type: Schema.Types.ObjectId, ref: 'users' },
    defender: { type: Schema.Types.ObjectId, ref: 'users' },
    winner: { type: Schema.Types.ObjectId, ref: 'users' },
    marching : {type : Schema.Types.ObjectId , ref : 'marchings'},
    attackerUnits : [{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }],
    defenderUnits : [{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }],
    rounds : [{type : Schema.Types.ObjectId , ref : 'battle_rounds'}]
})

const Battles = model<IBattle>('battles', BattleSchema)

export default Battles