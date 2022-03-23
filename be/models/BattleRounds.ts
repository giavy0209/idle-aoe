import { model, Schema, Types } from 'mongoose'
import { IBattleRound } from 'interfaces'

const BattleRoundSchema = new Schema<IBattleRound>({
    name : {type : String},
    battle : {type : Schema.Types.ObjectId , ref :'battles'},
    actions : [{type : Schema.Types.ObjectId , ref : 'battle_actions'}],
})

const BattleRounds = model<IBattleRound>('battle_rounds', BattleRoundSchema)

export default BattleRounds