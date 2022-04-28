"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Tranningchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'unit_datas' },
    userUnit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'units' },
    building: { type: mongoose_1.Schema.Types.ObjectId, ref: 'building_dataas' },
    userBuilding: { type: mongoose_1.Schema.Types.ObjectId, ref: 'buildings' },
    castle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'castles' },
    total: { type: Number },
    lastUpdate: { type: Date, default: Date.now },
    finishAt: { type: Date, default: Date.now },
    time: { type: Number },
});
var Trainnings = (0, mongoose_1.model)('trainnings', Tranningchema);
exports.default = Trainnings;
//# sourceMappingURL=Trainnings.js.map