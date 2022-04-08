import { model, Schema, Types } from 'mongoose'
import { IBattleRound } from 'interfaces'

const BattleRoundSchema = new Schema<IBattleRound>({
    name : {type : String},
    battle : {type : Schema.Types.ObjectId , ref :'battles'},
    actions : [{type : Schema.Types.ObjectId , ref : 'battle_actions'}],
    attackerStartUnits :[{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }] ,
    attackerEndUnits :[{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }] ,
    defenderStartUnits :[{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }] ,
    defenderEndUnits :[{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }] ,
    attackerDead :[{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }] ,
    defenderDead : [{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }],
})

const BattleRounds = model<IBattleRound>('battle_rounds', BattleRoundSchema)

export default BattleRounds