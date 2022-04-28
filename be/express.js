"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var routers_1 = require("./routers");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
app.use('/', routers_1.default);
exports.default = app;
//# sourceMappingURL=express.js.map