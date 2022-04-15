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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("models");
var mongoose_1 = require("mongoose");
var wsServices_1 = require("../wsServices");
var workerChangeUnit_1 = require("../worker/workerChangeUnit");
var marchingController = /** @class */ (function () {
    function marchingController() {
    }
    marchingController.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, castle, findCastle, marchingFrom, marchingTo, marching;
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
                    case 4: return [4 /*yield*/, models_1.Marchings.find({
                            user: _id,
                            status: { $in: [0, 1] },
                            fromCastle: findCastle === null || findCastle === void 0 ? void 0 : findCastle._id
                        })
                            .populate('user target units.unit fromCastle targetCastle')];
                    case 5:
                        marchingFrom = _a.sent();
                        return [4 /*yield*/, models_1.Marchings.find({
                                target: _id,
                                status: { $in: [0] },
                                type: { $in: [3] },
                                targetCastle: findCastle === null || findCastle === void 0 ? void 0 : findCastle._id
                            })
                                .populate('user target units.unit fromCastle targetCastle')];
                    case 6:
                        marchingTo = _a.sent();
                        marching = __spreadArray(__spreadArray([], __read(marchingFrom), false), __read(marchingTo), false);
                        res.send({
                            status: 1,
                            data: marching
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    marchingController.attack = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, type, _type, _a, units, movingSpeed, target, fromCastle, user, checkUnit, index, _unit, userUnit, findTarget, unitSpeed, speed, arriveTime, homeTime, index, _unit;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        type = req.query.type;
                        _type = Number(type);
                        if (!_type)
                            return [2 /*return*/, res.send({ status: 100 })];
                        _a = req.body, units = _a.units, movingSpeed = _a.movingSpeed, target = _a.target, fromCastle = _a.fromCastle;
                        return [4 /*yield*/, models_1.Users.findById(_id)
                                .populate('world')];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        if (movingSpeed < 0.1 || movingSpeed > 1 || !(0, mongoose_1.isValidObjectId)(target))
                            return [2 /*return*/, res.send({ status: 100 })];
                        checkUnit = [];
                        index = 0;
                        _b.label = 2;
                    case 2:
                        if (!(index < units.length)) return [3 /*break*/, 5];
                        _unit = units[index];
                        return [4 /*yield*/, models_1.Units.findOne({ _id: _unit._id, castle: fromCastle })];
                    case 3:
                        userUnit = _b.sent();
                        if (!userUnit)
                            return [2 /*return*/, res.send({ status: 100 })];
                        if (userUnit.total < _unit.total) {
                            return [2 /*return*/, res.send({ status: 100 })];
                        }
                        if (_unit.total > 0) {
                            checkUnit.push(__assign({}, _unit));
                        }
                        _b.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5:
                        units = checkUnit;
                        if (!units.length)
                            return [2 /*return*/, res.send({ status: 101 })];
                        return [4 /*yield*/, models_1.Castles.findById(target)];
                    case 6:
                        findTarget = _b.sent();
                        if (!findTarget)
                            return [2 /*return*/, res.send({ status: 100 })];
                        unitSpeed = 0;
                        units.forEach(function (_unit) {
                            if (_unit.unit.speed > unitSpeed)
                                unitSpeed = _unit.unit.speed;
                        });
                        speed = unitSpeed * 60 / movingSpeed / user.world.speed;
                        arriveTime = Date.now() + speed * 1000;
                        homeTime = Date.now() + speed * 1000 * 2;
                        return [4 /*yield*/, models_1.Marchings.create({
                                unitSpeed: unitSpeed,
                                units: units,
                                target: findTarget.user,
                                user: _id,
                                type: _type,
                                movingSpeed: movingSpeed,
                                arriveTime: arriveTime,
                                homeTime: homeTime,
                                fromCastle: fromCastle,
                                targetCastle: target,
                            })];
                    case 7:
                        _b.sent();
                        for (index = 0; index < units.length; index++) {
                            _unit = units[index];
                            workerChangeUnit_1.CHANGE_UNIT.push({
                                unit: _unit._id,
                                newValue: -_unit.total
                            });
                        }
                        (0, wsServices_1.changeMarching)(_id);
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    marchingController.return = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var marching, findMarching, movingTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        marching = req.body.marching;
                        if (!marching || !(0, mongoose_1.isValidObjectId)(marching))
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Marchings.findOne({ _id: marching, status: 0, type: { $in: [1, 2, 4, 5] } })];
                    case 1:
                        findMarching = _a.sent();
                        if (!findMarching)
                            return [2 /*return*/, res.send({ status: 100 })];
                        if (new Date(findMarching.arriveTime).getTime() - Date.now() < 30000)
                            return [2 /*return*/, res.send({ status: 101 })];
                        movingTime = Date.now() - new Date(findMarching.startTime).getTime();
                        findMarching.homeTime = Date.now() + movingTime;
                        findMarching.arriveTime = Date.now();
                        findMarching.status = 1;
                        return [4 /*yield*/, findMarching.save()];
                    case 2:
                        _a.sent();
                        res.send({ status: 1 });
                        (0, wsServices_1.changeMarching)(findMarching.user.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    return marchingController;
}());
exports.default = marchingController;
