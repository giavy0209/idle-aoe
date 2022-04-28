"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MarchingSchema = new mongoose_1.Schema({
    units: [{
            unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
            total: Number
        }],
    cargo: {
        gold: { type: Number, default: 0 },
        iron: { type: Number, default: 0 },
        wood: { type: Number, default: 0 },
        food: { type: Number, default: 0 }
    },
    trade: { type: mongoose_1.Schema.Types.ObjectId, ref: 'markets' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    fromCastle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
    target: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    targetCastle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
    type: { type: Number },
    unitSpeed: { type: Number },
    movingSpeed: { type: Number },
    startTime: { type: Date, default: Date.now },
    arriveTime: { type: Date },
    homeTime: { type: Date },
    status: { type: Number, default: 0 } // 0 : just send, 1 : arrive, 2 : home, 3 : dead all
});
var Marchings = (0, mongoose_1.model)('marchings', MarchingSchema);
exports.default = Marchings;
