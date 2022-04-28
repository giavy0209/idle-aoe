"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BattleActionSchema = new mongoose_1.Schema({
    type: { type: Number },
    battleRound: { type: mongoose_1.Schema.Types.ObjectId, ref: 'battle_rounds' },
    unitAttack: {
        user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
        castle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
        unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
        total: { type: Number },
        damage: { type: Number }
    },
    unitDefend: {
        user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
        castle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
        unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
        totalHit: { type: Number },
    }
});
var BattleActions = (0, mongoose_1.model)('battle_actions', BattleActionSchema);
exports.default = BattleActions;
//# sourceMappingURL=BattleActions.js.map