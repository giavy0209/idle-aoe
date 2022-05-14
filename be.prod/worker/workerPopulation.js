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
var models_1 = require("models");
var utils_1 = require("../utils");
function workerResource() {
    return __awaiter(this, void 0, void 0, function () {
        var lastRun, users, index, user, totalUserPopulation, castles, _loop_1, cindex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastRun = Date.now();
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 14];
                    return [4 /*yield*/, models_1.Users.find({})];
                case 2:
                    users = _a.sent();
                    index = 0;
                    _a.label = 3;
                case 3:
                    if (!(index < users.length)) return [3 /*break*/, 11];
                    user = users[index];
                    totalUserPopulation = 0;
                    return [4 /*yield*/, models_1.Castles.find({ user: user._id, isGhost: false })];
                case 4:
                    castles = _a.sent();
                    _loop_1 = function (cindex) {
                        var castle, units, marchings, totalPopulation;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    castle = castles[cindex];
                                    return [4 /*yield*/, models_1.Units.find({ user: user._id, castle: castle._id })
                                            .populate('unit')];
                                case 1:
                                    units = _b.sent();
                                    return [4 /*yield*/, models_1.Marchings.find({ user: user._id, fromCastle: castle._id, status: { $in: [0, 1] } })
                                            .populate('units.unit')];
                                case 2:
                                    marchings = _b.sent();
                                    totalPopulation = 0;
                                    units.forEach(function (_a) {
                                        var unit = _a.unit, total = _a.total, inTower = _a.inTower;
                                        totalPopulation += unit.population * total;
                                        totalPopulation += unit.population * inTower;
                                    });
                                    marchings.forEach(function (marching) {
                                        marching.units.forEach(function (_a) {
                                            var unit = _a.unit, total = _a.total;
                                            totalPopulation += unit.population * total;
                                        });
                                    });
                                    castle.population = totalPopulation;
                                    return [4 /*yield*/, castle.save()];
                                case 3:
                                    _b.sent();
                                    totalUserPopulation += totalPopulation;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    cindex = 0;
                    _a.label = 5;
                case 5:
                    if (!(cindex < castles.length)) return [3 /*break*/, 8];
                    return [5 /*yield**/, _loop_1(cindex)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    cindex++;
                    return [3 /*break*/, 5];
                case 8:
                    user.population = totalUserPopulation;
                    return [4 /*yield*/, user.save()];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    index++;
                    return [3 /*break*/, 3];
                case 11:
                    if (!(Date.now() - lastRun < 60000)) return [3 /*break*/, 13];
                    return [4 /*yield*/, (0, utils_1.waitfor)(60000 - (Date.now() - lastRun))];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    lastRun = Date.now();
                    return [3 /*break*/, 1];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.default = workerResource;
