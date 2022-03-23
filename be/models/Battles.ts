import { model, Schema, Types } from 'mongoose'
import { IBattle } from 'interfaces'

const BattleSchema = new Schema<IBattle>({
    attacker: { type: Schema.Types.ObjectId, ref: 'users' },
    defender: { type: Schema.Types.ObjectId, ref: 'users' },
    marching : {type : Schema.Types.ObjectId , ref : 'marchings'},
    rounds : [{type : Schema.Types.ObjectId , ref : 'battle_rounds'}]
})

const Battles = model<IBattle>('battles', BattleSchema)

export default Battles