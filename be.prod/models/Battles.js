"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BattleSchema = new mongoose_1.Schema({
    attacker: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    attackerCastle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
    defender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    defenderCastle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
    winner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    marching: { type: mongoose_1.Schema.Types.ObjectId, ref: 'marchings' },
    attackerUnits: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    defenderUnits: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    rounds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'battle_rounds' }],
    spy: {
        resources: {
            gold: { type: Number },
            iron: { type: Number },
            wood: { type: Number },
            food: { type: Number }
        },
        units: [{
                unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
                total: Number
            }],
        buildings: [{
                building: { type: mongoose_1.Schema.Types.ObjectId, ref: 'building_datas' },
                level: Number
            }],
        quickWalkerLost: { type: Number }
    },
    attackerDead: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    defenderDead: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    attackerExp: { type: Number, default: 0 },
    defenderExp: { type: Number, default: 0 },
    loyalReduce: { type: Number, default: 0 },
    loyalLeft: { type: Number },
    isConquered: { type: Boolean }
});
var Battles = (0, mongoose_1.model)('battles', BattleSchema);
exports.default = Battles;
