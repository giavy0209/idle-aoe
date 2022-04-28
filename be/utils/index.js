"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRndInteger = exports.waitfor = void 0;
var waitfor = function (ms) { return new Promise(function (r) { return setTimeout(r, ms); }); };
exports.waitfor = waitfor;
var getRndInteger = function (min, max) {
    return (Math.random() * (max - min)) + min;
};
exports.getRndInteger = getRndInteger;
//# sourceMappingURL=index.js.map