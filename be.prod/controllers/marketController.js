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
var mongoose_1 = require("mongoose");
var workerChangeResource_1 = require("../worker/workerChangeResource");
var wsServices_1 = require("wsServices");
var services_1 = require("services");
var marketController = /** @class */ (function () {
    function marketController() {
    }
    marketController.get = function (req, res) {
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
                    case 4: return [4 /*yield*/, models_1.Markets.find({ user: _id, status: 0, castle: findCastle === null || findCastle === void 0 ? void 0 : findCastle._id })
                            .sort({ _id: -1 })];
                    case 5:
                        data = _a.sent();
                        res.send({ status: 1, data: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    marketController.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, _a, offer, receive, castle, findCastle, totalOffer, totalReceive, key, value, key, value, user, marketCargo, userResources, isEnoughRes, changeResourceData, _loop_1, key, state_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        _a = req.body, offer = _a.offer, receive = _a.receive, castle = _a.castle;
                        if ((!offer || !receive || !castle || !(0, mongoose_1.isValidObjectId)(castle)))
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, castle.findById(castle)];
                    case 1:
                        findCastle = _b.sent();
                        if (findCastle)
                            return [2 /*return*/, res.send({ status: 100 })];
                        totalOffer = 0;
                        totalReceive = 0;
                        for (key in offer) {
                            if (Object.prototype.hasOwnProperty.call(offer, key)) {
                                value = offer[key];
                                totalOffer += value;
                            }
                        }
                        for (key in receive) {
                            if (Object.prototype.hasOwnProperty.call(receive, key)) {
                                value = receive[key];
                                totalReceive += value;
                            }
                        }
                        if (totalOffer !== totalReceive)
                            return [2 /*return*/, res.send({ status: 100, msg: 'not equal' })];
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 2:
                        user = _b.sent();
                        if (!user || !user.clan)
                            return [2 /*return*/, res.send({ status: 102 })];
                        return [4 /*yield*/, services_1.marketService.calcTotalCargo({ user: user._id, castle: findCastle._id })];
                    case 3:
                        marketCargo = _b.sent();
                        if (totalOffer > marketCargo)
                            return [2 /*return*/, res.send({ status: 101 })];
                        return [4 /*yield*/, models_1.Resources.find({ user: _id, castle: findCastle._id })
                                .populate('type')];
                    case 4:
                        userResources = _b.sent();
                        isEnoughRes = true;
                        changeResourceData = [];
                        _loop_1 = function (key) {
                            if (Object.prototype.hasOwnProperty.call(offer, key)) {
                                var value_1 = offer[key];
                                if (!value_1)
                                    return "continue";
                                var userResource = userResources.find(function (o) { return (o.type.name.toLowerCase() === key.toLocaleLowerCase() && o.value >= value_1); });
                                if (!userResource) {
                                    isEnoughRes = false;
                                    return "break";
                                }
                                changeResourceData.push({
                                    resource: userResource._id,
                                    newValue: -value_1,
                                });
                            }
                        };
                        for (key in offer) {
                            state_1 = _loop_1(key);
                            if (state_1 === "break")
                                break;
                        }
                        if (!isEnoughRes)
                            return [2 /*return*/, res.send({ status: 100, msg: 'not enough' })];
                        changeResourceData.forEach(function (data) {
                            workerChangeResource_1.CHANGE_RESOURCE.push(data);
                        });
                        return [4 /*yield*/, models_1.Markets.create({
                                user: _id,
                                clan: user.clan,
                                offer: offer,
                                receive: receive,
                                castle: findCastle._id,
                                status: 0,
                                endAt: Date.now() + 12 * 60 * 60 * 1000, //end after 12h
                            })];
                    case 5:
                        _b.sent();
                        res.send({ status: 1 });
                        (0, wsServices_1.changeMarketOffer)(_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    marketController.getClan = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 1:
                        user = _a.sent();
                        if (!user || !user.clan)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Markets.find({ clan: user.clan, user: { $ne: _id }, status: 0 })
                                .populate('user')
                                .sort({ _id: -1 })];
                    case 2:
                        data = _a.sent();
                        res.send({ status: 1, data: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    marketController.putClan = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, id, castle, findCastle, market, userOffer, userReceive, userReceiveResources, isEnoughRes, changeResourceData, _loop_2, key, state_2, movingTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        id = req.params.id;
                        castle = req.body.castle;
                        if (!(0, mongoose_1.isValidObjectId)(id) || !castle || !(0, mongoose_1.isValidObjectId)(castle))
                            return [2 /*return*/, res.send({ status: 100, msg: 'not valid id' })];
                        return [4 /*yield*/, models_1.Castles.findById(castle)];
                    case 1:
                        findCastle = _a.sent();
                        if (!findCastle)
                            return [2 /*return*/, res.send({ status: 100, msg: 'not find castle' })];
                        return [4 /*yield*/, models_1.Markets.findOne({ _id: id, status: 0 })];
                    case 2:
                        market = _a.sent();
                        if (!market)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Users.findById(market.user)];
                    case 3:
                        userOffer = _a.sent();
                        return [4 /*yield*/, models_1.Users.findById(_id)
                                .populate('world')];
                    case 4:
                        userReceive = _a.sent();
                        if (!userOffer || !userReceive || userOffer.clan.toString() !== userReceive.clan.toString())
                            return [2 /*return*/, res.send({ status: 100, msg: 'not found clan' })];
                        return [4 /*yield*/, models_1.Resources.find({ user: _id, castle: findCastle._id })
                                .populate('type')];
                    case 5:
                        userReceiveResources = _a.sent();
                        isEnoughRes = true;
                        changeResourceData = [];
                        _loop_2 = function (key) {
                            if (Object.prototype.hasOwnProperty.call(market.receive, key)) {
                                var value_2 = market.receive[key];
                                if (!value_2)
                                    return "continue";
                                var userResource = userReceiveResources.find(function (o) { return (o.type.name.toLowerCase() === key.toLocaleLowerCase() && o.value >= value_2); });
                                if (!userResource) {
                                    isEnoughRes = false;
                                    return "break";
                                }
                                changeResourceData.push({
                                    resource: userResource._id,
                                    newValue: -value_2,
                                });
                            }
                        };
                        for (key in market.receive) {
                            state_2 = _loop_2(key);
                            if (state_2 === "break")
                                break;
                        }
                        if (!isEnoughRes)
                            return [2 /*return*/, res.send({ status: 101 })];
                        changeResourceData.forEach(function (data) {
                            workerChangeResource_1.CHANGE_RESOURCE.push(data);
                        });
                        movingTime = 15 * 60 * 1000 / userReceive.world.speed;
                        return [4 /*yield*/, models_1.Marchings.create({
                                user: userOffer._id,
                                target: userReceive._id,
                                cargo: market.offer,
                                type: 3,
                                unitSpeed: 15,
                                movingSpeed: 1,
                                arriveTime: Date.now() + movingTime,
                                homeTime: Date.now() + movingTime * 2,
                                trade: market._id,
                                fromCastle: market.castle,
                                targetCastle: findCastle._id
                            })];
                    case 6:
                        _a.sent();
                        market.status = 1;
                        return [4 /*yield*/, market.save()];
                    case 7:
                        _a.sent();
                        res.send({ status: 1 });
                        (0, wsServices_1.changeMarching)(_id);
                        (0, wsServices_1.changeMarching)(userOffer._id.toString());
                        (0, wsServices_1.changeMarketOffer)(userOffer._id.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    marketController.postCaravan = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _id, _b, data, speed, castle, findCastle, changeResourceData, marchingCargo, totalCargo, index, _data, resource, resourceName, marketCargo, movingTime;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _id = req._id;
                        _b = req.body, data = _b.data, speed = _b.speed, castle = _b.castle;
                        if (speed < 10 || speed > 600 || !castle || !(0, mongoose_1.isValidObjectId)(castle))
                            return [2 /*return*/, res.send({ status: 101 })];
                        if (!((_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a._id) || data.length > 4)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Castles.findById(castle)];
                    case 1:
                        findCastle = _c.sent();
                        if (!findCastle)
                            return [2 /*return*/, res.send({ status: 100 })];
                        changeResourceData = [];
                        marchingCargo = {
                            gold: 0,
                            iron: 0,
                            wood: 0,
                            food: 0
                        };
                        totalCargo = 0;
                        index = 0;
                        _c.label = 2;
                    case 2:
                        if (!(index < data.length)) return [3 /*break*/, 5];
                        _data = data[index];
                        if (!(0, mongoose_1.isValidObjectId)(_id) || !_data.value)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Resources.findOne({ _id: _data._id, user: _id, value: { $gte: _data.value } })
                                .populate('type')];
                    case 3:
                        resource = _c.sent();
                        if (!resource)
                            return [2 /*return*/, res.send({ status: 100 })];
                        changeResourceData.push({
                            resource: resource._id.toString(),
                            newValue: -_data.value
                        });
                        resourceName = resource.type.name.toLowerCase();
                        marchingCargo[resourceName] = _data.value;
                        totalCargo += _data.value;
                        _c.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, services_1.marketService.calcTotalCargo({ user: _id, castle: findCastle._id })];
                    case 6:
                        marketCargo = _c.sent();
                        if (marketCargo < totalCargo)
                            return [2 /*return*/, res.send({ status: 100 })];
                        movingTime = speed * 60 * 1000;
                        return [4 /*yield*/, models_1.Marchings.create({
                                user: _id,
                                cargo: marchingCargo,
                                arriveTime: Date.now() + movingTime,
                                homeTime: Date.now() + movingTime * 2,
                                type: 4,
                                movingSpeed: 1,
                                unitSpeed: speed,
                                fromCastle: findCastle._id
                            })];
                    case 7:
                        _c.sent();
                        res.send({ status: 1 });
                        changeResourceData.forEach(function (data) { return workerChangeResource_1.CHANGE_RESOURCE.push(data); });
                        (0, wsServices_1.changeMarching)(_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    return marketController;
}());
exports.default = marketController;
