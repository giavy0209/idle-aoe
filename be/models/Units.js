"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UnitSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
    total: { type: Number, default: 0 },
    inTower: { type: Number, default: 0 },
    castle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' }
});
var Units = (0, mongoose_1.model)('units', UnitSchema);
exports.default = Units;
//# sourceMappingURL=Units.js.map