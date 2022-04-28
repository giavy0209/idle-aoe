"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MarketSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    clan: { type: mongoose_1.Schema.Types.ObjectId, ref: 'clans' },
    castle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
    offer: {
        gold: { type: Number },
        iron: { type: Number },
        wood: { type: Number },
        food: { type: Number },
    },
    receive: {
        gold: { type: Number },
        iron: { type: Number },
        wood: { type: Number },
        food: { type: Number },
    },
    endAt: { type: Date },
    status: { type: Number }, //0 : offering, 1 : moving, 2 : done
}, {
    timestamps: true
});
var Markets = (0, mongoose_1.model)('markets', MarketSchema);
exports.default = Markets;
