"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var wsServices_1 = require("wsServices");
var workerChangeResource_1 = require("../worker/workerChangeResource");
var mongoose_1 = require("mongoose");
var workerChangeEXP_1 = require("../worker/workerChangeEXP");
var trainningController = /** @class */ (function () {
    function trainningController() {
    }
    trainningController.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, unit, unitData, building, time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        unit = req.query.unit;
                        return [4 /*yield*/, models_1.UnitDatas.findOne({ name: unit }).lean()];
                    case 1:
                        unitData = _a.sent();
                        if (!unitData)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Buildings.findOne({ user: _id, building: unitData.building })];
                    case 2:
                        building = _a.sent();
                        if (!building)
                            return [2 /*return*/, res.send({ status: 100 })];
                        time = unitData.time - unitData.time * building.value / 100;
                        res.send({ status: 1, data: __assign(__assign(__assign({}, unitData), unitData.resource), { time: time }) });
                        return [2 /*return*/];
                }
            });
        });
    };
    trainningController.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, _a, unit, total, castle, isTranning, user, unitData, baseCost, costs, key, _resource, userResource, isEnoughResource, building, dereaseTime, unitTrainingTime, time, finishAt, userUnit, resourceUsed, index, resource, name;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        _a = req.body, unit = _a.unit, total = _a.total, castle = _a.castle;
                        total = Number(total);
                        if (!total)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Trainnings.findOne({ user: _id, castle: castle })];
                    case 1:
                        isTranning = _b.sent();
                        if (isTranning)
                            return [2 /*return*/, res.send({ status: 101 })];
                        return [4 /*yield*/, models_1.Users.findById(_id)
                                .populate('world')];
                    case 2:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.UnitDatas.findById(unit)];
                    case 3:
                        unitData = _b.sent();
                        if (!unitData)
                            return [2 /*return*/, res.send({ status: 100 })];
                        baseCost = __assign({}, unitData.resource);
                        costs = __assign({}, unitData.resource);
                        for (key in baseCost) {
                            if (Object.prototype.hasOwnProperty.call(baseCost, key)) {
                                _resource = baseCost[key];
                                costs[key] = _resource * total;
                            }
                        }
                        return [4 /*yield*/, models_1.Resources.find({ user: _id, castle: castle })
                                .populate('type')];
                    case 4:
                        userResource = _b.sent();
                        if (!userResource)
                            return [2 /*return*/, res.send({ status: 100 })];
                        isEnoughResource = true;
                        userResource.forEach(function (el) {
                            var resource = el.type.name.toLowerCase();
                            var value = el.value;
                            if (costs[resource] > value)
                                isEnoughResource = false;
                        });
                        if (!isEnoughResource)
                            return [2 /*return*/, res.send({ status: 102 })];
                        return [4 /*yield*/, models_1.Buildings.findOne({ user: _id, building: unitData.building })];
                    case 5:
                        building = _b.sent();
                        dereaseTime = building ? building.value / 100 : 0;
                        unitTrainingTime = unitData.time / user.world.speed;
                        time = unitTrainingTime - unitTrainingTime * dereaseTime;
                        finishAt = Date.now() + time * 1000;
                        return [4 /*yield*/, models_1.Units.findOne({ user: _id, unit: unit })];
                    case 6:
                        userUnit = _b.sent();
                        return [4 /*yield*/, models_1.Trainnings.create({
                                user: _id,
                                unit: unit,
                                castle: castle,
                                userUnit: userUnit === null || userUnit === void 0 ? void 0 : userUnit._id,
                                building: unitData.building,
                                userBuilding: building === null || building === void 0 ? void 0 : building._id,
                                total: total,
                                finishAt: finishAt,
                                time: Date.now() + time * 1000 * total
                            })];
                    case 7:
                        _b.sent();
                        resourceUsed = 0;
                        for (index = 0; index < userResource.length; index++) {
                            resource = userResource[index];
                            name = resource.type.name.toLowerCase();
                            workerChangeResource_1.CHANGE_RESOURCE.push({
                                resource: resource._id,
                                newValue: -costs[name]
                            });
                            resourceUsed += costs[name];
                        }
                        workerChangeEXP_1.CHANGE_EXP.push({
                            user: _id,
                            newValue: Math.floor(resourceUsed / 3)
                        });
                        (0, wsServices_1.changeUser)(_id);
                        (0, wsServices_1.changeTrainningQueue)(_id);
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    trainningController.getTrainningQueue = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, castle, findCastle, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        castle = req.query.castle;
                        if (!castle) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.Castles.findById(castle)];
                    case 1:
                        findCastle = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!findCastle) return [3 /*break*/, 4];
                        return [4 /*yield*/, models_1.Castles.findOne({ user: _id })];
                    case 3:
                        findCastle = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, models_1.Trainnings.findOne({ user: _id, castle: findCastle === null || findCastle === void 0 ? void 0 : findCastle._id })
                            .populate('unit')];
                    case 5:
                        data = _a.sent();
                        res.send({ status: 1, data: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    trainningController.cancel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, training;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        training = req.body.training;
                        if (!(0, mongoose_1.isValidObjectId)(training))
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Trainnings.findByIdAndDelete(training)];
                    case 1:
                        _a.sent();
                        res.send({ status: 1 });
                        (0, wsServices_1.changeTrainningQueue)(_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    return trainningController;
}());
exports.default = trainningController;
