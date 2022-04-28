"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var express_1 = require("express");
var router = (0, express_1.Router)();
var routes = fs_1.default.readdirSync(__dirname);
var prefix = path_1.default.basename(__dirname);
routes.filter(function (o) { return o !== 'index.ts'; })
    .forEach(function (route) { return router.use("/".concat(prefix), require(path_1.default.join(__dirname, route)).default); });
exports.default = router;
//# sourceMappingURL=index.js.map