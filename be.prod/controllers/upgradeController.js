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
var upgradeController = /** @class */ (function () {
    function upgradeController() {
    }
    upgradeController.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, _a, building, castle, buildingData, userBuilding, buildingLevel, findUpgrade;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        _a = req.query, building = _a.building, castle = _a.castle;
                        return [4 /*yield*/, models_1.BuildingDatas.findOne({ name: building }).lean()];
                    case 1:
                        buildingData = _b.sent();
                        if (!buildingData)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Buildings.findOne({ user: _id, building: buildingData._id, castle: castle }).lean()];
                    case 2:
                        userBuilding = _b.sent();
                        if (!userBuilding)
                            return [2 /*return*/, res.send({ status: 100 })];
                        buildingLevel = userBuilding.level + 1;
                        findUpgrade = buildingData.upgrade.find(function (o) { return o.level === buildingLevel; });
                        if (!findUpgrade)
                            return [2 /*return*/, res.send({ status: 101 })];
                        res.send({ status: 1, data: __assign(__assign({}, findUpgrade), { name: buildingData.name, _id: userBuilding._id }) });
                        return [2 /*return*/];
                }
            });
        });
    };
    upgradeController.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, building, castle, findCastle, userBuilding, world, buildingLevel, buildingData, findUpgrade, isUpgrading, userResource, isEnoughResource, resourceUsed, index, resource, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        building = req.query.building;
                        castle = req.body.castle;
                        return [4 /*yield*/, models_1.Castles.findById(castle)];
                    case 1:
                        findCastle = _a.sent();
                        if (!findCastle)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Buildings.findOne({ _id: building, castle: findCastle._id })
                                .populate('user')];
                    case 2:
                        userBuilding = _a.sent();
                        if (!userBuilding)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Worlds.findById(userBuilding.user.world)];
                    case 3:
                        world = _a.sent();
                        if (!world)
                            return [2 /*return*/, res.send({ status: 100 })];
                        buildingLevel = userBuilding.level + 1;
                        return [4 /*yield*/, models_1.BuildingDatas.findById(userBuilding.building)];
                    case 4:
                        buildingData = _a.sent();
                        if (!buildingData)
                            return [2 /*return*/, res.send({ status: 100 })];
                        findUpgrade = buildingData.upgrade.find(function (o) { return o.level === buildingLevel; });
                        if (!findUpgrade)
                            return [2 /*return*/, res.send({ status: 101 })];
                        return [4 /*yield*/, models_1.Buildings.findOne({ user: _id, isUpgrade: true, castle: findCastle._id })
                                .populate('user')];
                    case 5:
                        isUpgrading = _a.sent();
                        if (isUpgrading)
                            return [2 /*return*/, res.send({ status: 103 })];
                        return [4 /*yield*/, models_1.Resources.find({ user: _id, castle: findCastle._id })
                                .populate('type')];
                    case 6:
                        userResource = _a.sent();
                        isEnoughResource = true;
                        userResource.forEach(function (el) {
                            var resource = el.type.name.toLowerCase();
                            var value = el.value;
                            if (findUpgrade[resource] > value)
                                isEnoughResource = false;
                        });
                        if (!isEnoughResource)
                            return [2 /*return*/, res.send({ status: 102 })];
                        userBuilding.finishAt = Date.now() + findUpgrade.time * 1000 / world.speed;
                        userBuilding.isUpgrade = true;
                        return [4 /*yield*/, userBuilding.save()];
                    case 7:
                        _a.sent();
                        resourceUsed = 0;
                        for (index = 0; index < userResource.length; index++) {
                            resource = userResource[index];
                            name = resource.type.name.toLowerCase();
                            workerChangeResource_1.CHANGE_RESOURCE.push({
                                resource: resource._id,
                                newValue: -findUpgrade[name],
                            });
                            resourceUsed += findUpgrade[name];
                        }
                        workerChangeEXP_1.CHANGE_EXP.push({
                            user: _id,
                            newValue: resourceUsed
                        });
                        (0, wsServices_1.changeBuilding)(_id);
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    upgradeController.cancel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, building, findBuilding;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        building = req.body.building;
                        if (!(0, mongoose_1.isValidObjectId)(building))
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Buildings.findById(building)];
                    case 1:
                        findBuilding = _a.sent();
                        if (!findBuilding)
                            return [2 /*return*/, res.send({ status: 100 })];
                        findBuilding.isUpgrade = false;
                        return [4 /*yield*/, findBuilding.save()];
                    case 2:
                        _a.sent();
                        res.send({ status: 1 });
                        (0, wsServices_1.changeBuilding)(_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    return upgradeController;
}());
exports.default = upgradeController;
