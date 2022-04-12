import { model, Schema, Types } from 'mongoose'
import { IBattleAction } from 'interfaces'

const BattleActionSchema = new Schema<IBattleAction>({
    type : {type : Number},
    battleRound : {type : Schema.Types.ObjectId , ref : 'battle_rounds'},
    unitAttack : {
        user : {type : Schema.Types.ObjectId , ref : 'users'},
        castle : {type : Schema.Types.ObjectId , ref : 'castles'},
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : {type : Number},
        damage : {type : Number}
    },
    unitDefend : {
        user : {type : Schema.Types.ObjectId , ref : 'users'},
        castle : {type : Schema.Types.ObjectId , ref : 'castles'},
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        totalHit : {type : Number},
    }
})

const BattleActions = model<IBattleAction>('battle_actions', BattleActionSchema)

export default BattleActions