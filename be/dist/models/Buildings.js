"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BuildingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    building: { type: mongoose_1.Schema.Types.ObjectId, ref: 'building_datas' },
    level: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    resource: { type: mongoose_1.Schema.Types.ObjectId, ref: 'resources' },
    isUpgrade: { type: Boolean, default: false },
    finishAt: { type: Date },
    castle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castle' }
});
var Buildings = (0, mongoose_1.model)('buildings', BuildingSchema);
exports.default = Buildings;
