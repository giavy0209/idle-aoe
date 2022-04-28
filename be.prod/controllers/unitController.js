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
var workerChangeUnit_1 = require("../worker/workerChangeUnit");
var unitController = /** @class */ (function () {
    function unitController() {
    }
    unitController.get = function (req, res) {
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
                    case 4: return [4 /*yield*/, models_1.Units.find({ user: _id, castle: findCastle === null || findCastle === void 0 ? void 0 : findCastle._id })
                            .populate('unit user')];
                    case 5:
                        data = _a.sent();
                        res.send({ status: 1, data: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    unitController.patch = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _id, data, tower, userTower, units, inTower, changeUnitData, index, _b, unit, type, value, findUnit;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _id = req._id;
                        data = req.body.data;
                        if (!((_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a.unit))
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.BuildingDatas.findOne({ name: 'Tower' })];
                    case 1:
                        tower = _c.sent();
                        if (!tower)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Buildings.findOne({ user: _id, building: tower._id })];
                    case 2:
                        userTower = _c.sent();
                        if (!userTower)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Units.find({ user: _id })
                                .populate('unit')];
                    case 3:
                        units = _c.sent();
                        inTower = 0;
                        units.forEach(function (o) { return inTower += o.unit.population * o.inTower; });
                        changeUnitData = [];
                        index = 0;
                        _c.label = 4;
                    case 4:
                        if (!(index < data.length)) return [3 /*break*/, 7];
                        _b = data[index], unit = _b.unit, type = _b.type, value = _b.value;
                        return [4 /*yield*/, models_1.Units.findById(unit)
                                .populate('unit')];
                    case 5:
                        findUnit = _c.sent();
                        if (!findUnit)
                            return [3 /*break*/, 6];
                        if (type === 'movein') {
                            inTower += findUnit.unit.population * value;
                            changeUnitData.push({
                                unit: findUnit._id,
                                newValue: -value,
                                moveTower: true
                            });
                        }
                        if (type === 'moveout') {
                            inTower -= findUnit.unit.population * value;
                            changeUnitData.push({
                                unit: findUnit._id,
                                newValue: value,
                                moveTower: true
                            });
                        }
                        if (inTower > userTower.value)
                            return [2 /*return*/, res.send({ status: 101 })];
                        _c.label = 6;
                    case 6:
                        index++;
                        return [3 /*break*/, 4];
                    case 7:
                        changeUnitData.forEach(function (unitData) {
                            workerChangeUnit_1.CHANGE_UNIT.push(unitData);
                        });
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    return unitController;
}());
exports.default = unitController;
