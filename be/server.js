"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = require("./express");
var server = http_1.default.createServer(express_1.default);
server.listen(global.Config.PORT);
exports.default = server;
//# sourceMappingURL=server.js.map