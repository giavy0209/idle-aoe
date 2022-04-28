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
var services = {
    create: function (_a) {
        var user = _a.user, _b = _a.isGhost, isGhost = _b === void 0 ? false : _b, _c = _a.isCapital, isCapital = _c === void 0 ? false : _c, _d = _a.name, name = _d === void 0 ? 'Capital' : _d;
        return __awaiter(void 0, void 0, void 0, function () {
            var findUser, castle, listBuildings, index, listBuilding, building, units, totalUnits, index, unit;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, models_1.Users.findById(user)];
                    case 1:
                        findUser = _e.sent();
                        if (!findUser)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, models_1.Castles.create({
                                user: user,
                                isGhost: isGhost,
                                isCapital: isCapital,
                                name: name,
                                clan: findUser.clan,
                                world: findUser.world,
                            })];
                    case 2:
                        castle = _e.sent();
                        return [4 /*yield*/, models_1.BuildingDatas.find({})];
                    case 3:
                        listBuildings = _e.sent();
                        index = 0;
                        _e.label = 4;
                    case 4:
                        if (!(index < listBuildings.length)) return [3 /*break*/, 8];
                        listBuilding = listBuildings[index];
                        return [4 /*yield*/, models_1.Buildings.create({
                                castle: castle._id,
                                user: findUser._id,
                                building: listBuilding._id,
                                value: listBuilding.upgrade[0].generate,
                                resource: listBuilding.resource,
                            })];
                    case 5:
                        building = _e.sent();
                        if (!listBuilding.resource) return [3 /*break*/, 7];
                        return [4 /*yield*/, models_1.Resources.create({
                                user: findUser._id,
                                type: listBuilding.resource,
                                building: building._id,
                                castle: castle._id,
                            })];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        index++;
                        return [3 /*break*/, 4];
                    case 8: return [4 /*yield*/, models_1.UnitDatas.find({})];
                    case 9:
                        units = _e.sent();
                        totalUnits = 0;
                        if (isGhost)
                            totalUnits = 20000;
                        index = 0;
                        _e.label = 10;
                    case 10:
                        if (!(index < units.length)) return [3 /*break*/, 13];
                        unit = units[index];
                        return [4 /*yield*/, models_1.Units.create({
                                user: findUser._id,
                                unit: unit._id,
                                castle: castle._id,
                                total: totalUnits
                            })];
                    case 11:
                        _e.sent();
                        _e.label = 12;
                    case 12:
                        index++;
                        return [3 /*break*/, 10];
                    case 13: return [2 /*return*/, castle];
                }
            });
        });
    }
};
exports.default = services;
//# sourceMappingURL=castleService.js.map