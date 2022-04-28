"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BattleRoundSchema = new mongoose_1.Schema({
    name: { type: String },
    battle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'battles' },
    actions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'battle_actions' }],
    attackerStartUnits: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    attackerEndUnits: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    defenderStartUnits: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    defenderEndUnits: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    attackerDead: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    defenderDead: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
});
var BattleRounds = (0, mongoose_1.model)('battle_rounds', BattleRoundSchema);
exports.default = BattleRounds;
//# sourceMappingURL=BattleRounds.js.map