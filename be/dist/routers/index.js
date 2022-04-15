"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = require("express");
var prefix = '/';
var router = (0, express_1.Router)();
var routes = fs_1.default.readdirSync(__dirname);
routes.filter(function (o) { return !o.includes('index'); })
    .forEach(function (route) { return router.use(prefix, require(path_1.default.join(__dirname, route)).default); });
exports.default = router;
