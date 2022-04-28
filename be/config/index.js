"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var ENVS = [
    'PORT',
    'MONGO_HOST',
    'MONGO_PORT',
    'MONGO_USER',
    'MONGO_PASSWORD',
    'MONGO_DB'
];
global.Config = {
    PORT: process.env.PORT,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB: process.env.MONGO_DB,
    JWT: process.env.JWT,
};
//# sourceMappingURL=index.js.map