"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BuildingDataSchema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    resource: { type: mongoose_1.Schema.Types.ObjectId, ref: 'resource_datas' },
    order: { type: Number },
    upgrade: [{
            gold: Number,
            iron: Number,
            wood: Number,
            food: Number,
            level: Number,
            time: Number,
            generate: Number,
        }],
});
var BuildingDatas = (0, mongoose_1.model)('building_datas', BuildingDataSchema);
exports.default = BuildingDatas;
