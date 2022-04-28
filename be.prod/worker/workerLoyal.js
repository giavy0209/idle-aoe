"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var utils_1 = require("../utils");
var secInHour = 3600000;
function workerLoyal() {
    return __awaiter(this, void 0, void 0, function () {
        var lastRun, orderBuilding, castles, index, castle, order, now, diffTime, increaseLoyalPerHour, percentDiffTime, valueIncrease;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastRun = Date.now();
                    return [4 /*yield*/, models_1.BuildingDatas.findOne({ name: 'Order' })];
                case 1:
                    orderBuilding = _a.sent();
                    if (!orderBuilding)
                        return [2 /*return*/];
                    _a.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 11];
                    return [4 /*yield*/, models_1.Castles.find({ loyal: { $lt: 10000 } })];
                case 3:
                    castles = _a.sent();
                    index = 0;
                    _a.label = 4;
                case 4:
                    if (!(index < castles.length)) return [3 /*break*/, 8];
                    castle = castles[index];
                    return [4 /*yield*/, models_1.Buildings.findOne({ castle: castle._id, building: orderBuilding._id })];
                case 5:
                    order = _a.sent();
                    if (!order)
                        return [3 /*break*/, 7];
                    now = Date.now();
                    diffTime = now - new Date(castle.lastUpdate).getTime();
                    increaseLoyalPerHour = order.level * 100 + 100;
                    percentDiffTime = diffTime / secInHour;
                    valueIncrease = increaseLoyalPerHour * percentDiffTime;
                    castle.loyal += valueIncrease;
                    castle.lastUpdate = now;
                    return [4 /*yield*/, castle.save()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    index++;
                    return [3 /*break*/, 4];
                case 8:
                    if (!(Date.now() - lastRun < 60000)) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, utils_1.waitfor)(60000 - (Date.now() - lastRun))];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    lastRun = Date.now();
                    return [3 /*break*/, 2];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.default = workerLoyal;
