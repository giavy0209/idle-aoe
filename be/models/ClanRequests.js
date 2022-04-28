"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ClanRequestSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    clan: { type: mongoose_1.Schema.Types.ObjectId, ref: 'clans' },
}, {
    timestamps: true,
});
var ClanRequests = (0, mongoose_1.model)('clan_requests', ClanRequestSchema);
exports.default = ClanRequests;
//# sourceMappingURL=ClanRequests.js.map