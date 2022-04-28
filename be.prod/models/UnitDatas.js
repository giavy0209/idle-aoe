"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UnitDataSchema = new mongoose_1.Schema({
    name: { type: String },
    time: Number,
    speed: Number,
    cargo: Number,
    life: Number,
    range: Number,
    building: { type: mongoose_1.Schema.Types.ObjectId, ref: 'building_datas' },
    description: { type: String, default: '' },
    population: { type: Number },
    resource: {
        gold: Number,
        iron: Number,
        wood: Number,
        food: Number,
    },
    strength: {
        barrack: Number,
        archer: Number,
        stable: Number,
        workshop: Number,
    }
});
var UnitDatas = (0, mongoose_1.model)('unit_datas', UnitDataSchema);
exports.default = UnitDatas;
