"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    lastLogin: { type: Date },
    world: { type: mongoose_1.Schema.Types.ObjectId, ref: 'worlds' },
    exp: { type: Number, default: 0 },
    clan: { type: mongoose_1.Schema.Types.ObjectId, ref: 'clans' },
    population: { type: Number, default: 0 },
    lastOnline: { type: Date },
    sockets: [{ type: String, default: [] }]
}, {
    timestamps: true,
});
var Users = (0, mongoose_1.model)('users', UserSchema);
exports.default = Users;
