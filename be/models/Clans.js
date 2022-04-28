"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ClanSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    world: { type: mongoose_1.Schema.Types.ObjectId, ref: 'worlds' },
    exp: { type: Number, default: 0 },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    website: { type: String, default: '' },
    members: { type: Number, default: 1 },
    minPopulation: { type: Number, default: 0 },
}, {
    timestamps: true,
});
var Clans = (0, mongoose_1.model)('clans', ClanSchema);
exports.default = Clans;
//# sourceMappingURL=Clans.js.map