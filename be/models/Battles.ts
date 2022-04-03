import { model, Schema, Types } from 'mongoose'
import { IBattle } from 'interfaces'

const BattleSchema = new Schema<IBattle>({
    attacker: { type: Schema.Types.ObjectId, ref: 'users' },
    attackerCastle: { type: Schema.Types.ObjectId, ref: 'castles' },
    defender: { type: Schema.Types.ObjectId, ref: 'users' },
    defenderCastle: { type: Schema.Types.ObjectId, ref: 'castles' },
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
    rounds : [{type : Schema.Types.ObjectId , ref : 'battle_rounds'}],
    spy : {
        resources : {
            gold : {type : Number},
            iron : {type : Number},
            wood : {type : Number},
            food : {type : Number}
        },
        units : [{
            unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
            total : Number
        }],
        buildings : [{
            building : {type : Schema.Types.ObjectId , ref : 'building_datas'},
            level : Number
        }],
        quickWalkerLost : {type : Number}
    },
    attackerDead : [{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }],
    defenderDead : [{
        unit : {type : Schema.Types.ObjectId , ref : 'unit_datas'},
        total : Number
    }],
    attackerExp : {type : Number},
    defenderExp : {type : Number},
})

const Battles = model<IBattle>('battles', BattleSchema)

export default Battles