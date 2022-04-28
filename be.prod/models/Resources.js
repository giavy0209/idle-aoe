"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ResourceSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    type: { type: mongoose_1.Schema.Types.ObjectId, ref: 'resource_datas' },
    building: { type: mongoose_1.Schema.Types.ObjectId, ref: 'buildings' },
    castle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
    lastUpdate: { type: Date, default: Date.now },
    value: { type: Number, default: 500 },
    inMarket: { type: Number, default: 0 }
});
var Resources = (0, mongoose_1.model)('resources', ResourceSchema);
exports.default = Resources;
