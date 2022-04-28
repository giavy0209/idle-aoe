"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var WorldSchema = new mongoose_1.Schema({
    name: { type: String },
    speed: { type: Number },
    averageEXP: { type: Number },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now }
});
var Worlds = (0, mongoose_1.model)('worlds', WorldSchema);
// Worlds.create({
//     name : "World 1",
//     speed : 1,
//     endDate : new Date('2022-04-25T00:00:00.000+00:00')
// })
exports.default = Worlds;
