"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CastleSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    loyal: { type: Number, default: 10000 },
    population: { type: Number, default: 0 },
    world: { type: mongoose_1.Schema.Types.ObjectId, ref: 'worlds' },
    clan: { type: mongoose_1.Schema.Types.ObjectId, ref: 'clans' },
    name: { type: String, default: 'Capital' },
    isCapital: { type: Boolean, default: true },
    lastUpdate: { type: Date, default: Date.now },
    isGhost: { type: Boolean, default: false }
});
var Castles = (0, mongoose_1.model)('castles', CastleSchema);
exports.default = Castles;
//# sourceMappingURL=Castles.js.map