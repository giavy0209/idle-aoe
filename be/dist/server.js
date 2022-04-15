"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var createExpress_1 = __importDefault(require("./createExpress"));
var server = http_1.default.createServer(createExpress_1.default);
server.listen(global.Config.PORT);
exports.default = server;
