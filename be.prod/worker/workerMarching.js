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
var utils_1 = require("../utils");
var workerChangeEXP_1 = require("./workerChangeEXP");
var workerChangeResource_1 = require("./workerChangeResource");
var workerChangeUnit_1 = require("./workerChangeUnit");
function steal(marching) {
    return __awaiter(this, void 0, void 0, function () {
        var targetResource, cargo, shelter, targetShelter, shelterValue_1, totalResources_1, hidePerRes_1, cargoPerRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Resources.find({ user: marching.target, castle: marching.targetCastle })
                        .populate('type')
                        .sort({ value: 1 })];
                case 1:
                    targetResource = _a.sent();
                    cargo = 0;
                    return [4 /*yield*/, models_1.BuildingDatas.findOne({ name: 'Shelter' })];
                case 2:
                    shelter = _a.sent();
                    if (!shelter) return [3 /*break*/, 4];
                    return [4 /*yield*/, models_1.Buildings.findOne({ user: marching.target, castle: marching.targetCastle, building: shelter._id })];
                case 3:
                    targetShelter = _a.sent();
                    if (targetShelter) {
                        shelterValue_1 = targetShelter.value;
                        totalResources_1 = 0;
                        targetResource.forEach(function (_a) {
                            var value = _a.value;
                            return totalResources_1 += value;
                        });
                        if (totalResources_1 <= shelterValue_1) {
                            targetResource.forEach(function (resource) {
                                resource.value = 0;
                            });
                        }
                        else {
                            hidePerRes_1 = 0;
                            targetResource.forEach(function (resource, index) {
                                hidePerRes_1 = Math.floor(shelterValue_1 / (4 - index));
                                var targetResourceValue = resource.value;
                                var resourceCanHide = targetResourceValue > hidePerRes_1 ? hidePerRes_1 : targetResourceValue;
                                shelterValue_1 -= resourceCanHide;
                                resource.value -= resourceCanHide;
                            });
                        }
                    }
                    _a.label = 4;
                case 4:
                    marching.units.forEach(function (unit) {
                        cargo += unit.unit.cargo * unit.total;
                    });
                    cargoPerRes = 0;
                    targetResource.forEach(function (resource, index) {
                        cargoPerRes = Math.floor(cargo / (4 - index));
                        var targetResourceValue = resource.value;
                        var resourceCanSteal = targetResourceValue > cargoPerRes ? cargoPerRes : targetResourceValue;
                        cargo -= resourceCanSteal;
                        var resourceName = resource.type.name.toLowerCase();
                        marching.cargo[resourceName] = resourceCanSteal;
                        workerChangeResource_1.CHANGE_RESOURCE.push({
                            resource: resource._id,
                            newValue: -resourceCanSteal,
                        });
                    });
                    marching.status = 1;
                    return [4 /*yield*/, marching.save()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function findDefenderUnits(target, targetCastle) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Units.aggregate([
                        {
                            $match: {
                                user: target,
                                total: { $gt: 0 },
                                castle: targetCastle,
                            }
                        },
                        {
                            $lookup: {
                                from: 'unit_datas',
                                localField: 'unit',
                                foreignField: '_id',
                                as: 'unit'
                            }
                        },
                        {
                            $unwind: {
                                path: "$unit",
                            }
                        },
                        {
                            $lookup: {
                                from: 'building_datas',
                                localField: 'unit.building',
                                foreignField: '_id',
                                as: 'unit.building'
                            }
                        },
                        {
                            $unwind: {
                                path: "$unit.building",
                            }
                        },
                        {
                            $group: {
                                _id: "$unit.building.order",
                                units: {
                                    $push: {
                                        unit: "$unit",
                                        total: "$total"
                                    }
                                }
                            }
                        },
                        {
                            $sort: {
                                _id: 1
                            }
                        },
                        {
                            $project: {
                                order: "$_id",
                                units: 1
                            }
                        }
                    ])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function findAttackerUnits(marching) {
    var attackerUnitsWithOrder = [
        {
            order: 1,
            units: []
        },
        {
            order: 2,
            units: []
        },
        {
            order: 3,
            units: []
        },
        {
            order: 4,
            units: []
        }
    ];
    var attackerUnitsNotSort = marching.units;
    attackerUnitsNotSort.forEach(function (unit) {
        var _a;
        var attackerUnitOrder = attackerUnitsWithOrder.find(function (o) { return o.order === unit.unit.building.order; });
        if (attackerUnitOrder) {
            (_a = attackerUnitOrder.units) === null || _a === void 0 ? void 0 : _a.push(unit);
        }
    });
    return attackerUnitsWithOrder.filter(function (o) { return o.units.length > 0; });
}
var randomUnitToHit = function (canHit) {
    var filterCanHit = canHit.filter(function (value) {
        if (!value.dead && value.total > 0)
            return true;
        return (value.total > 0 && value.dead < value.total);
    });
    var randomUnit = filterCanHit[Math.round(Math.random() * (filterCanHit.length - 1))];
    return randomUnit;
};
var Hit = function (canHit, unit, total, round, attacker, defender, unitDead, attackerCastle, defenderCastle) {
    return __awaiter(this, void 0, void 0, function () {
        var randomHit, strength, attackStrength, unitType, key, randomStrength, totalStrength, unitCanHitLeft, totalLife, totalDead, instantlyKill, battleActions, findUnitDead, strengthLeft, attackUnitLeft, battleActions, findUnitDead;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    randomHit = randomUnitToHit(canHit);
                    if (!randomHit)
                        return [2 /*return*/];
                    strength = unit.strength;
                    strength = {
                        barrack: strength.barrack,
                        archer: strength.archer,
                        stable: strength.stable,
                        workshop: strength.workshop,
                        order: strength.barrack
                    };
                    attackStrength = 0;
                    unitType = randomHit.unit.building.name.toLowerCase();
                    for (key in strength) {
                        if (unitType.includes(key)) {
                            attackStrength = strength[key];
                        }
                    }
                    randomStrength = (0, utils_1.getRndInteger)(-0.05, 0.05);
                    attackStrength += attackStrength * randomStrength;
                    totalStrength = attackStrength * total;
                    unitCanHitLeft = randomHit.total - (randomHit.dead || 0);
                    totalLife = randomHit.unit.life * unitCanHitLeft;
                    if (!(totalStrength < totalLife)) return [3 /*break*/, 2];
                    totalDead = 0;
                    instantlyKill = Math.random() * 100 <= 5 ? true : false;
                    if (instantlyKill) {
                        totalDead = Math.ceil(totalStrength / randomHit.unit.life);
                    }
                    else {
                        totalDead = Math.floor(totalStrength / randomHit.unit.life);
                    }
                    if (randomHit.dead) {
                        randomHit.dead += totalDead;
                    }
                    else {
                        randomHit.dead = totalDead;
                    }
                    return [4 /*yield*/, models_1.BattleActions.create({
                            type: 1,
                            battleRound: round._id,
                            unitAttack: {
                                user: attacker,
                                unit: unit._id,
                                total: Number(total),
                                damage: Number(totalStrength),
                                castle: attackerCastle,
                            },
                            unitDefend: {
                                user: defender,
                                unit: randomHit.unit._id,
                                totalHit: Number(totalDead),
                                castle: defenderCastle,
                            }
                        })];
                case 1:
                    battleActions = _a.sent();
                    findUnitDead = unitDead.find(function (o) { return o.unit._id.toString() === randomHit.unit._id.toString(); });
                    if (!findUnitDead) {
                        unitDead.push({
                            unit: randomHit.unit,
                            total: Number(totalDead)
                        });
                    }
                    else {
                        findUnitDead.total += Number(totalDead);
                    }
                    round.actions.push(battleActions._id);
                    return [3 /*break*/, 5];
                case 2:
                    randomHit.dead = randomHit.total;
                    strengthLeft = totalStrength - totalLife;
                    attackUnitLeft = Math.floor(strengthLeft / attackStrength);
                    return [4 /*yield*/, models_1.BattleActions.create({
                            battleRound: round._id,
                            type: 1,
                            unitAttack: {
                                user: attacker,
                                unit: unit._id,
                                total: Number(total - attackUnitLeft),
                                damage: Number(totalStrength - strengthLeft),
                                castle: attackerCastle,
                            },
                            unitDefend: {
                                user: defender,
                                unit: randomHit.unit._id,
                                totalHit: Number(unitCanHitLeft),
                                castle: defenderCastle,
                            }
                        })];
                case 3:
                    battleActions = _a.sent();
                    findUnitDead = unitDead.find(function (o) { return o.unit._id.toString() === randomHit.unit._id.toString(); });
                    if (!findUnitDead) {
                        unitDead.push({
                            unit: randomHit.unit,
                            total: Number(unitCanHitLeft)
                        });
                    }
                    else {
                        findUnitDead.total += Number(unitCanHitLeft);
                    }
                    round.actions.push(battleActions._id);
                    if (!(attackUnitLeft > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Hit(canHit, unit, attackUnitLeft, round, attacker, defender, unitDead, attackerCastle, defenderCastle)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
};
function unitHitByUnit(attackerUnits, defenderUnitsWithOrder, round, attacker, defender, unitDead, attackerCastle, defenderCastle) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (i) {
                        var _b, unit, total, canHit, lowestRange;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = attackerUnits[i], unit = _b.unit, total = _b.total;
                                    if (total <= 0)
                                        return [2 /*return*/, "continue"];
                                    canHit = [];
                                    lowestRange = 5;
                                    defenderUnitsWithOrder.forEach(function (_a) {
                                        var units = _a.units;
                                        units.forEach(function (defenderUnit) {
                                            if (defenderUnit.unit.range < lowestRange && defenderUnit.total > 0) {
                                                lowestRange = defenderUnit.unit.range;
                                            }
                                        });
                                    });
                                    defenderUnitsWithOrder.forEach(function (_a) {
                                        var units = _a.units;
                                        units.forEach(function (defenderUnit) {
                                            if (defenderUnit.unit.range === lowestRange) {
                                                canHit.push(defenderUnit);
                                            }
                                        });
                                    });
                                    defenderUnitsWithOrder.forEach(function (_a) {
                                        var units = _a.units;
                                        units.forEach(function (defenderUnit) {
                                            var isHave = canHit.find(function (o) { return o.unit._id === defenderUnit.unit._id; });
                                            if (!isHave) {
                                                canHit.push(defenderUnit);
                                            }
                                        });
                                    });
                                    return [4 /*yield*/, Hit(canHit, unit, total, round, attacker, defender, unitDead, attackerCastle, defenderCastle)];
                                case 1:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < attackerUnits.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function reduceLoyal(marching) {
    return __awaiter(this, void 0, void 0, function () {
        var noblemanUnit, noblemanLeft, totalNobleman, loyalReducePerOne, totalLoyalReduce, targetCastle, isConquered, attackerCapital, buildingOrder, attackerOrder, totalAttackerCastle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.UnitDatas.findOne({ name: 'Nobleman' })];
                case 1:
                    noblemanUnit = _a.sent();
                    if (!noblemanUnit)
                        return [2 /*return*/, { loyalReduce: 0, loyalLeft: 10000, isConquered: false }];
                    noblemanLeft = marching.units.find(function (o) { return o.unit._id.toString() === noblemanUnit._id.toString(); });
                    if (!noblemanLeft)
                        return [2 /*return*/, { loyalReduce: 0, loyalLeft: 10000, isConquered: false }];
                    totalNobleman = noblemanLeft.total;
                    if (totalNobleman <= 0)
                        return [2 /*return*/, { loyalReduce: 0, loyalLeft: 10000, isConquered: false }];
                    loyalReducePerOne = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
                    totalLoyalReduce = loyalReducePerOne * totalNobleman;
                    return [4 /*yield*/, models_1.Castles.findById(marching.targetCastle)];
                case 2:
                    targetCastle = _a.sent();
                    if (!targetCastle)
                        return [2 /*return*/, { loyalReduce: 0, loyalLeft: 10000, isConquered: false }];
                    targetCastle.loyal -= totalLoyalReduce;
                    if (targetCastle.loyal < 0)
                        targetCastle.loyal = 0;
                    targetCastle.lastUpdate = Date.now();
                    isConquered = false;
                    if (!(targetCastle.loyal <= 0 && !targetCastle.isCapital)) return [3 /*break*/, 7];
                    return [4 /*yield*/, models_1.Castles.findOne({ user: marching.user, isCapital: true })];
                case 3:
                    attackerCapital = _a.sent();
                    return [4 /*yield*/, models_1.BuildingDatas.findOne({ name: 'Order' })];
                case 4:
                    buildingOrder = _a.sent();
                    if (!attackerCapital || !buildingOrder)
                        return [2 /*return*/, { loyalReduce: totalLoyalReduce, loyalLeft: targetCastle.loyal, isConquered: isConquered }];
                    return [4 /*yield*/, models_1.Buildings.findOne({ building: buildingOrder._id, castle: attackerCapital._id })];
                case 5:
                    attackerOrder = _a.sent();
                    return [4 /*yield*/, models_1.Castles.countDocuments({ user: marching.user })];
                case 6:
                    totalAttackerCastle = _a.sent();
                    if (!attackerOrder || attackerOrder.value <= totalAttackerCastle)
                        return [2 /*return*/, { loyalReduce: totalLoyalReduce, loyalLeft: targetCastle.loyal, isConquered: isConquered }];
                    targetCastle.user = marching.user;
                    targetCastle.isGhost = false;
                    isConquered = true;
                    _a.label = 7;
                case 7: return [4 /*yield*/, targetCastle.save()];
                case 8:
                    _a.sent();
                    return [2 /*return*/, { loyalReduce: totalLoyalReduce, loyalLeft: targetCastle.loyal, isConquered: isConquered }];
            }
        });
    });
}
var mapUnitWithOrderToBaseUnit = function (unitWithOrder) {
    var mapedUnits = [];
    unitWithOrder.forEach(function (_a) {
        var units = _a.units;
        units.forEach(function (el) {
            if (el.total > 0) {
                mapedUnits.push(__assign({}, el));
            }
        });
    });
    return mapedUnits;
};
var calcDeadUnits = function (startUnits, endUnits) {
    var dead = [];
    startUnits.forEach(function (_start) {
        var findEnd = endUnits.find(function (o) { return o.unit._id.toString() === _start.unit._id.toString(); });
        if (findEnd) {
            if (_start.total - findEnd.total > 0) {
                dead.push({
                    unit: _start.unit,
                    total: _start.total - findEnd.total
                });
            }
        }
        else {
            dead.push({
                unit: _start.unit,
                total: _start.total
            });
        }
    });
    return dead;
};
function attack(marching) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var defenderStartUnits, defenderUnitsWithOrder, cloneDefenderUnitWithOrder, attackerUnitsWithOrder, totalRound, round, battle, attackerDead, defenderDead, index, _loop_2, state_1, totalAttackerDead, totalDefenderDead, index_1, units, baseUnits, index_2, unit, baseUnit, changeValue, userUnit;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, models_1.Units.find({ user: marching.target, castle: marching.targetCastle, total: { $gt: 0 } })];
                case 1:
                    defenderStartUnits = _c.sent();
                    return [4 /*yield*/, findDefenderUnits(marching.target, marching.targetCastle)];
                case 2:
                    defenderUnitsWithOrder = _c.sent();
                    cloneDefenderUnitWithOrder = JSON.parse(JSON.stringify(defenderUnitsWithOrder));
                    attackerUnitsWithOrder = findAttackerUnits(marching);
                    totalRound = 1;
                    round = new models_1.BattleRounds({
                        name: "Round ".concat(totalRound),
                        attackerStartUnits: marching.units,
                        defenderStartUnits: defenderStartUnits,
                    });
                    battle = new models_1.Battles({
                        attacker: marching.user,
                        attackerCastle: marching.fromCastle,
                        defender: marching.target,
                        defenderCastle: marching.targetCastle,
                        marching: marching._id,
                        rounds: [],
                        attackerUnits: marching.units,
                        defenderUnits: defenderStartUnits,
                    });
                    attackerDead = [];
                    defenderDead = [];
                    round.battle = battle._id;
                    index = 0;
                    _loop_2 = function () {
                        var defenderUnitLeft, attackerUnitLeft, attackerUnits, defenderUnits, _d, loyalLeft, loyalReduce, isConquered;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    if (index === 0) {
                                        battle.rounds.push(round._id);
                                    }
                                    defenderUnitLeft = 0;
                                    attackerUnitLeft = 0;
                                    attackerUnits = (_a = attackerUnitsWithOrder.find(function (o) { return o.order === index + 1; })) === null || _a === void 0 ? void 0 : _a.units;
                                    defenderUnits = (_b = defenderUnitsWithOrder.find(function (o) { return o.order === index + 1; })) === null || _b === void 0 ? void 0 : _b.units;
                                    if (!attackerUnits) return [3 /*break*/, 2];
                                    return [4 /*yield*/, unitHitByUnit(attackerUnits, defenderUnitsWithOrder, round, marching.user, marching.target, defenderDead, marching.fromCastle, marching.targetCastle)];
                                case 1:
                                    _e.sent();
                                    _e.label = 2;
                                case 2:
                                    if (!defenderUnits) return [3 /*break*/, 4];
                                    return [4 /*yield*/, unitHitByUnit(defenderUnits, attackerUnitsWithOrder, round, marching.target, marching.user, attackerDead, marching.targetCastle, marching.fromCastle)];
                                case 3:
                                    _e.sent();
                                    _e.label = 4;
                                case 4:
                                    defenderUnitsWithOrder.forEach(function (el) {
                                        el.units.forEach(function (unit) {
                                            if (unit.dead) {
                                                unit.total -= unit.dead;
                                            }
                                            defenderUnitLeft += unit.total;
                                            unit.dead = 0;
                                        });
                                    });
                                    attackerUnitsWithOrder.forEach(function (el) {
                                        el.units.forEach(function (unit) {
                                            if (unit.dead) {
                                                unit.total -= unit.dead;
                                            }
                                            attackerUnitLeft += unit.total;
                                            unit.dead = 0;
                                        });
                                    });
                                    if (!(defenderUnitLeft <= 0 || attackerUnitLeft <= 0)) return [3 /*break*/, 10];
                                    if (!(defenderUnitLeft <= 0)) return [3 /*break*/, 6];
                                    marching.status = 1;
                                    return [4 /*yield*/, steal(marching)];
                                case 5:
                                    _e.sent();
                                    _e.label = 6;
                                case 6:
                                    if (attackerUnitLeft <= 0) {
                                        marching.status = 3;
                                    }
                                    if (!(defenderUnitLeft <= 0 && attackerUnitLeft > 0)) return [3 /*break*/, 8];
                                    battle.winner = marching.user;
                                    return [4 /*yield*/, reduceLoyal(marching)];
                                case 7:
                                    _d = _e.sent(), loyalLeft = _d.loyalLeft, loyalReduce = _d.loyalReduce, isConquered = _d.isConquered;
                                    battle.loyalReduce = loyalReduce,
                                        battle.loyalLeft = loyalLeft;
                                    battle.isConquered = isConquered;
                                    _e.label = 8;
                                case 8:
                                    if (attackerUnitLeft <= 0 && defenderUnitLeft > 0) {
                                        battle.winner = marching.target;
                                    }
                                    round.attackerEndUnits = mapUnitWithOrderToBaseUnit(attackerUnitsWithOrder);
                                    round.defenderEndUnits = mapUnitWithOrderToBaseUnit(defenderUnitsWithOrder);
                                    round.attackerDead = calcDeadUnits(round.attackerStartUnits, round.attackerEndUnits);
                                    round.defenderDead = calcDeadUnits(round.defenderStartUnits, round.defenderEndUnits);
                                    return [4 /*yield*/, round.save()];
                                case 9:
                                    _e.sent();
                                    return [2 /*return*/, "break"];
                                case 10:
                                    index++;
                                    if (!(index === 4)) return [3 /*break*/, 12];
                                    totalRound++;
                                    index = 0;
                                    round.attackerEndUnits = mapUnitWithOrderToBaseUnit(attackerUnitsWithOrder);
                                    round.defenderEndUnits = mapUnitWithOrderToBaseUnit(defenderUnitsWithOrder);
                                    round.attackerDead = calcDeadUnits(round.attackerStartUnits, round.attackerEndUnits);
                                    round.defenderDead = calcDeadUnits(round.defenderStartUnits, round.defenderEndUnits);
                                    return [4 /*yield*/, round.save()];
                                case 11:
                                    _e.sent();
                                    round = new models_1.BattleRounds({
                                        name: "Round ".concat(totalRound),
                                        battle: battle._id
                                    });
                                    _e.label = 12;
                                case 12: return [2 /*return*/];
                            }
                        });
                    };
                    _c.label = 3;
                case 3:
                    if (!true) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_2()];
                case 4:
                    state_1 = _c.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 5];
                    return [3 /*break*/, 3];
                case 5:
                    totalAttackerDead = 0;
                    attackerDead.forEach(function (_a) {
                        var unit = _a.unit, total = _a.total;
                        totalAttackerDead += (unit.population * total);
                    });
                    totalDefenderDead = 0;
                    defenderDead.forEach(function (_a) {
                        var unit = _a.unit, total = _a.total;
                        totalDefenderDead += (unit.population * total);
                    });
                    battle.attackerDead = attackerDead;
                    battle.defenderDead = defenderDead;
                    battle.attackerExp = totalDefenderDead * 3;
                    battle.defenderExp = totalAttackerDead * 3;
                    workerChangeEXP_1.CHANGE_EXP.push({
                        user: marching.user,
                        newValue: totalDefenderDead * 3
                    });
                    workerChangeEXP_1.CHANGE_EXP.push({
                        user: marching.target,
                        newValue: totalAttackerDead * 3
                    });
                    return [4 /*yield*/, battle.save()];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, marching.save()];
                case 7:
                    _c.sent();
                    index_1 = 0;
                    _c.label = 8;
                case 8:
                    if (!(index_1 < defenderUnitsWithOrder.length)) return [3 /*break*/, 13];
                    units = defenderUnitsWithOrder[index_1].units;
                    baseUnits = cloneDefenderUnitWithOrder[index_1].units;
                    index_2 = 0;
                    _c.label = 9;
                case 9:
                    if (!(index_2 < units.length)) return [3 /*break*/, 12];
                    unit = units[index_2];
                    baseUnit = baseUnits[index_2];
                    changeValue = unit.total - baseUnit.total;
                    return [4 /*yield*/, models_1.Units.findOne({ user: marching.target, castle: marching.targetCastle, unit: unit.unit._id })];
                case 10:
                    userUnit = _c.sent();
                    if (!userUnit)
                        return [3 /*break*/, 11];
                    workerChangeUnit_1.CHANGE_UNIT.push({
                        unit: userUnit._id,
                        newValue: changeValue,
                    });
                    _c.label = 11;
                case 11:
                    index_2++;
                    return [3 /*break*/, 9];
                case 12:
                    index_1++;
                    return [3 /*break*/, 8];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function spy(target, castle) {
    return __awaiter(this, void 0, void 0, function () {
        var resources, units, buildings, resource;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Resources.find({ user: target, castle: castle }).populate('type')];
                case 1:
                    resources = _a.sent();
                    return [4 /*yield*/, models_1.Units.find({ user: target, castle: castle, total: { $gt: 0 } })];
                case 2:
                    units = _a.sent();
                    return [4 /*yield*/, models_1.Buildings.find({ user: target, castle: castle })];
                case 3:
                    buildings = _a.sent();
                    resource = {
                        gold: 0,
                        iron: 0,
                        wood: 0,
                        food: 0
                    };
                    resources.forEach(function (_res) {
                        var name = _res.type.name.toLowerCase();
                        resource[name] = _res.value;
                    });
                    return [2 /*return*/, { resource: resource, units: units, buildings: buildings }];
            }
        });
    });
}
function handleMarchingAttack(marching) {
    return __awaiter(this, void 0, void 0, function () {
        var target, targetCastle, targetUnit, _a, loyalLeft, loyalReduce, isConquered;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.Users.findById(marching.target)];
                case 1:
                    target = _b.sent();
                    if (!target)
                        return [2 /*return*/];
                    return [4 /*yield*/, models_1.Castles.findById(marching.targetCastle)];
                case 2:
                    targetCastle = _b.sent();
                    if (!targetCastle)
                        return [2 /*return*/];
                    return [4 /*yield*/, models_1.Units.find({ user: target._id, castle: targetCastle._id, total: { $gt: 0 } })];
                case 3:
                    targetUnit = _b.sent();
                    if (!(targetUnit.length === 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, steal(marching)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, reduceLoyal(marching)];
                case 5:
                    _a = _b.sent(), loyalLeft = _a.loyalLeft, loyalReduce = _a.loyalReduce, isConquered = _a.isConquered;
                    return [4 /*yield*/, models_1.Battles.create({
                            attacker: marching.user,
                            attackerCastle: marching.fromCastle,
                            defender: marching.target,
                            defenderCastle: marching.targetCastle,
                            marching: marching._id,
                            attackerUnits: marching.units,
                            defenderUnits: [],
                            winner: marching.user,
                            rounds: [],
                            loyalLeft: loyalLeft,
                            loyalReduce: loyalReduce,
                            isConquered: isConquered,
                        })];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, attack(marching)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function handleMarchingSpy(marching) {
    return __awaiter(this, void 0, void 0, function () {
        var quickWalker, quickWalkerTarget, _a, resource, units, buildings;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, models_1.UnitDatas.findOne({ name: 'Quickwalker' })];
                case 1:
                    quickWalker = _b.sent();
                    return [4 /*yield*/, models_1.Units.findOne({ user: marching.target, castle: marching.targetCastle, unit: quickWalker === null || quickWalker === void 0 ? void 0 : quickWalker._id, total: { $gt: 0 } })];
                case 2:
                    quickWalkerTarget = _b.sent();
                    if (!(!quickWalkerTarget || quickWalkerTarget.total < marching.units[0].total)) return [3 /*break*/, 5];
                    return [4 /*yield*/, spy(marching.target, marching.targetCastle)];
                case 3:
                    _a = _b.sent(), resource = _a.resource, units = _a.units, buildings = _a.buildings;
                    return [4 /*yield*/, models_1.Battles.create({
                            attacker: marching.user,
                            attackerCastle: marching.fromCastle,
                            defender: marching.target,
                            defenderCastle: marching.targetCastle,
                            marching: marching._id,
                            winner: marching.user,
                            spy: {
                                resources: resource,
                                units: units,
                                buildings: buildings,
                                quickWalkerLost: (quickWalkerTarget === null || quickWalkerTarget === void 0 ? void 0 : quickWalkerTarget.total) ? quickWalkerTarget.total : 0
                            }
                        })];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    if (!quickWalkerTarget) return [3 /*break*/, 8];
                    if (!(quickWalkerTarget.total < marching.units[0].total)) return [3 /*break*/, 6];
                    marching.units[0].total -= quickWalkerTarget.total;
                    workerChangeUnit_1.CHANGE_UNIT.push({
                        unit: quickWalkerTarget._id,
                        newValue: -quickWalkerTarget.total,
                    });
                    return [3 /*break*/, 8];
                case 6:
                    workerChangeUnit_1.CHANGE_UNIT.push({
                        unit: quickWalkerTarget._id,
                        newValue: -marching.units[0].total,
                    });
                    return [4 /*yield*/, models_1.Battles.create({
                            attacker: marching.user,
                            attackerCastle: marching.fromCastle,
                            defender: marching.target,
                            defenderCastle: marching.targetCastle,
                            marching: marching._id,
                            winner: marching.target,
                            spy: {
                                quickWalkerLost: marching.units[0].total
                            }
                        })];
                case 7:
                    _b.sent();
                    marching.units[0].total = 0;
                    _b.label = 8;
                case 8:
                    if (marching.units[0].total === 0) {
                        marching.status = 3;
                    }
                    else {
                        marching.status = 1;
                    }
                    return [4 /*yield*/, marching.save()];
                case 9:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function handleMarchingTrade(marching) {
    return __awaiter(this, void 0, void 0, function () {
        var targetResource, marchingCargo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Resources.find({ user: marching.target, castle: marching.targetCastle })
                        .populate('type')];
                case 1:
                    targetResource = _a.sent();
                    marchingCargo = {
                        gold: 0,
                        iron: 0,
                        wood: 0,
                        food: 0,
                    };
                    targetResource.forEach(function (resource) {
                        var name = resource.type.name.toLowerCase();
                        var resourceOffer = marching.trade.offer[name];
                        if (resourceOffer > 0) {
                            workerChangeResource_1.CHANGE_RESOURCE.push({
                                resource: resource._id,
                                newValue: resourceOffer
                            });
                        }
                        var resourceReceive = marching.trade.receive[name];
                        if (resourceReceive > 0) {
                            marchingCargo[name] = resourceReceive;
                        }
                    });
                    marching.cargo = __assign({}, marchingCargo);
                    marching.status = 1;
                    return [4 /*yield*/, marching.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function handleMarchingNotArrive() {
    return __awaiter(this, void 0, void 0, function () {
        var marchingsNotArrive, index, marching;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Marchings.find({ arriveTime: { $lte: Date.now() }, status: 0 })
                        .populate({
                        path: 'trade'
                    })
                        .populate({
                        path: "units.unit",
                        populate: {
                            path: "building"
                        }
                    })];
                case 1:
                    marchingsNotArrive = _a.sent();
                    index = 0;
                    _a.label = 2;
                case 2:
                    if (!(index < marchingsNotArrive.length)) return [3 /*break*/, 12];
                    marching = marchingsNotArrive[index];
                    if (!(marching.type === 1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleMarchingAttack(marching)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(marching.type === 2)) return [3 /*break*/, 6];
                    return [4 /*yield*/, handleMarchingSpy(marching)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!(marching.type === 3)) return [3 /*break*/, 8];
                    return [4 /*yield*/, handleMarchingTrade(marching)];
                case 7:
                    _a.sent();
                    (0, wsServices_1.changeMarching)(marching.target.toString());
                    _a.label = 8;
                case 8:
                    if (!(marching.type === 4)) return [3 /*break*/, 10];
                    marching.status = 1;
                    return [4 /*yield*/, marching.save()];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    (0, wsServices_1.changeMarching)(marching.user.toString());
                    _a.label = 11;
                case 11:
                    index++;
                    return [3 /*break*/, 2];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function handleMarchingNotHome() {
    return __awaiter(this, void 0, void 0, function () {
        var marchingNotHome, _loop_3, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Marchings.find({ homeTime: { $lte: Date.now() }, status: 1 })];
                case 1:
                    marchingNotHome = _a.sent();
                    _loop_3 = function (index) {
                        var marching, cargo, resources, units, index_3, unit, userUnit, market;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    marching = marchingNotHome[index];
                                    cargo = marching.cargo;
                                    return [4 /*yield*/, models_1.Resources.find({ user: marching.user, castle: marching.fromCastle })
                                            .populate('type')];
                                case 1:
                                    resources = _b.sent();
                                    resources.forEach(function (resource) {
                                        var name = resource.type.name.toLowerCase();
                                        var resourceValue = cargo[name];
                                        if (resourceValue > 0) {
                                            workerChangeResource_1.CHANGE_RESOURCE.push({
                                                resource: resource._id,
                                                newValue: resourceValue,
                                            });
                                        }
                                    });
                                    marching.status = 2;
                                    units = marching.units;
                                    index_3 = 0;
                                    _b.label = 2;
                                case 2:
                                    if (!(index_3 < units.length)) return [3 /*break*/, 5];
                                    unit = units[index_3];
                                    return [4 /*yield*/, models_1.Units.findOne({ user: marching.user, unit: unit.unit, castle: marching.fromCastle })];
                                case 3:
                                    userUnit = _b.sent();
                                    if (!userUnit)
                                        return [3 /*break*/, 4];
                                    if (unit.total) {
                                        workerChangeUnit_1.CHANGE_UNIT.push({
                                            unit: userUnit._id,
                                            newValue: unit.total
                                        });
                                    }
                                    _b.label = 4;
                                case 4:
                                    index_3++;
                                    return [3 /*break*/, 2];
                                case 5: return [4 /*yield*/, marching.save()];
                                case 6:
                                    _b.sent();
                                    if (!(marching.type === 3)) return [3 /*break*/, 9];
                                    return [4 /*yield*/, models_1.Markets.findById(marching.trade)];
                                case 7:
                                    market = _b.sent();
                                    if (!market) return [3 /*break*/, 9];
                                    market.status = 2;
                                    return [4 /*yield*/, market.save()];
                                case 8:
                                    _b.sent();
                                    _b.label = 9;
                                case 9:
                                    (0, wsServices_1.changeMarching)(marching.user.toString());
                                    return [2 /*return*/];
                            }
                        });
                    };
                    index = 0;
                    _a.label = 2;
                case 2:
                    if (!(index < marchingNotHome.length)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_3(index)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    index++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function workerMarching() {
    return __awaiter(this, void 0, void 0, function () {
        var lastRun;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastRun = Date.now();
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 6];
                    return [4 /*yield*/, handleMarchingNotArrive()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, handleMarchingNotHome()];
                case 3:
                    _a.sent();
                    if (!(Date.now() - lastRun < 1000)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, utils_1.waitfor)(1000 - (Date.now() - lastRun))];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    lastRun = Date.now();
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = workerMarching;
