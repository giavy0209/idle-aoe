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
var wsServices_1 = require("wsServices");
var workerChangeResource_1 = require("../worker/workerChangeResource");
var clanController = /** @class */ (function () {
    function clanController() {
    }
    clanController.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, user, _a, page, name, skip, query, data, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        _a = req.query, page = _a.page, name = _a.name;
                        skip = Number(page) - 1 * 10 || 0;
                        query = { world: user.world };
                        if (name) {
                            query.name = name;
                        }
                        return [4 /*yield*/, models_1.Clans.find(query)
                                .limit(10)
                                .skip(skip)
                                .sort({ exp: -1 })
                                .populate('owner')];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, models_1.Clans.countDocuments(query)];
                    case 3:
                        total = _b.sent();
                        res.send({ status: 1, data: data, total: total });
                        return [2 /*return*/];
                }
            });
        });
    };
    clanController.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, _a, name, description, website, minPopulation, user, isHave, clan;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        _a = req.body, name = _a.name, description = _a.description, website = _a.website, minPopulation = _a.minPopulation;
                        name = name.trim();
                        if (name.length < 4 || name.length > 20)
                            return [2 /*return*/, res.send({ status: 101 })];
                        description = description.trim();
                        website = website.trim();
                        minPopulation = Number(minPopulation) || 0;
                        minPopulation = minPopulation < 50000 && minPopulation > 0 ? minPopulation : 0;
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        if (user.clan)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Clans.findOne({ name: name, world: user.world })];
                    case 2:
                        isHave = _b.sent();
                        if (isHave)
                            return [2 /*return*/, res.send({ status: 102 })];
                        return [4 /*yield*/, models_1.Clans.create({
                                name: name,
                                description: description,
                                website: website,
                                minPopulation: minPopulation,
                                owner: _id,
                                world: user.world
                            })];
                    case 3:
                        clan = _b.sent();
                        user.clan = clan._id;
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, models_1.ClanRequests.deleteMany({ user: _id })];
                    case 5:
                        _b.sent();
                        res.send({ status: 1 });
                        (0, wsServices_1.changeUser)(_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    clanController.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, markets, recevieResource, index, market, key, value, userResource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        return [4 /*yield*/, models_1.Users.updateOne({ _id: new mongoose_1.Types.ObjectId(_id) }, { $unset: { clan: 1 } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, models_1.Castles.updateMany({ user: new mongoose_1.Types.ObjectId(_id) }, { $unset: { clan: 1 } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, models_1.Markets.find({ user: _id, status: 0 })];
                    case 3:
                        markets = _a.sent();
                        recevieResource = {
                            gold: 0,
                            iron: 0,
                            wood: 0,
                            food: 0
                        };
                        index = 0;
                        _a.label = 4;
                    case 4:
                        if (!(index < markets.length)) return [3 /*break*/, 7];
                        market = markets[index];
                        market.status = 2;
                        return [4 /*yield*/, market.save()];
                    case 5:
                        _a.sent();
                        for (key in market.offer) {
                            if (Object.prototype.hasOwnProperty.call(market.offer, key)) {
                                value = market.offer[key];
                                if (value) {
                                    recevieResource[key] += value;
                                }
                            }
                        }
                        _a.label = 6;
                    case 6:
                        index++;
                        return [3 /*break*/, 4];
                    case 7:
                        res.send({ status: 1 });
                        return [4 /*yield*/, models_1.Resources.find({ user: _id })
                                .populate('type')];
                    case 8:
                        userResource = _a.sent();
                        userResource.forEach(function (resource) {
                            var resourceName = resource.type.name.toLowerCase();
                            var value = recevieResource[resourceName];
                            workerChangeResource_1.CHANGE_RESOURCE.push({
                                resource: resource._id,
                                newValue: value
                            });
                        });
                        (0, wsServices_1.changeUser)(_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    clanController.getJoin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, clanID, user, clan, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        clanID = req.params.id;
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Clans.findById(clanID)];
                    case 2:
                        clan = _a.sent();
                        if (!clan || clan.owner.toString() !== user._id.toString())
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.ClanRequests.find({ clan: clanID })
                                .populate('user')];
                    case 3:
                        data = _a.sent();
                        res.send({ status: 1, data: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    clanController.postJoin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, clanID, user, clan, isHave;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        clanID = req.params.id;
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Clans.findById(clanID)];
                    case 2:
                        clan = _a.sent();
                        if (!clan)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.ClanRequests.exists({ user: _id, clan: clanID })];
                    case 3:
                        isHave = _a.sent();
                        if (isHave)
                            return [2 /*return*/, res.send({ status: 101 })];
                        return [4 /*yield*/, models_1.ClanRequests.create({
                                clan: clanID,
                                user: _id
                            })];
                    case 4:
                        _a.sent();
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    clanController.putJoin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, requestID, request, owner, clan, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        requestID = req.params.id;
                        return [4 /*yield*/, models_1.ClanRequests.findById(requestID)];
                    case 1:
                        request = _b.sent();
                        if (!request)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 2:
                        owner = _b.sent();
                        if (!owner)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Clans.findById(request.clan)];
                    case 3:
                        clan = _b.sent();
                        if (!clan || clan.owner.toString() !== owner._id.toString())
                            return [2 /*return*/, res.send({ status: 100 })];
                        if (clan.members > 30)
                            return [2 /*return*/, res.send({ status: 101 })];
                        if (!request)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Users.findById(request.user)];
                    case 4:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        user.clan = clan._id;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _b.sent();
                        _a = clan;
                        return [4 /*yield*/, models_1.Users.countDocuments({ clan: clan._id })];
                    case 6:
                        _a.members = _b.sent();
                        return [4 /*yield*/, clan.save()];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, models_1.ClanRequests.deleteMany({ user: request.user })];
                    case 8:
                        _b.sent();
                        res.send({ status: 1 });
                        (0, wsServices_1.changeUser)(user._id.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    clanController.deleteJoin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, requestID, request, owner, clan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        requestID = req.params.id;
                        return [4 /*yield*/, models_1.ClanRequests.findById(requestID)];
                    case 1:
                        request = _a.sent();
                        if (!request)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 2:
                        owner = _a.sent();
                        if (!owner)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Clans.findById(request.clan)];
                    case 3:
                        clan = _a.sent();
                        if (!clan || clan.owner.toString() !== owner._id.toString())
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, request.delete()];
                    case 4:
                        _a.sent();
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    clanController.getDetail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var clanID, clanDetail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clanID = req.params.id;
                        return [4 /*yield*/, models_1.Clans.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.Types.ObjectId(clanID)
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'users',
                                        localField: '_id',
                                        foreignField: "clan",
                                        as: 'users'
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'users',
                                        localField: 'owner',
                                        foreignField: '_id',
                                        as: 'owner'
                                    }
                                },
                                {
                                    $unwind: {
                                        path: "$owner"
                                    }
                                }
                            ])];
                    case 1:
                        clanDetail = _a.sent();
                        if (!clanDetail.length)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [2 /*return*/, res.send({ status: 1, data: clanDetail[0] })];
                }
            });
        });
    };
    clanController.patchDetail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, clanID, _a, description, website, minPopulation, user, clan;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        clanID = req.params.id;
                        _a = req.body, description = _a.description, website = _a.website, minPopulation = _a.minPopulation;
                        description = description.trim();
                        website = website.trim();
                        minPopulation = Number(minPopulation) || 0;
                        minPopulation = minPopulation < 50000 && minPopulation > 0 ? minPopulation : 0;
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Clans.findById(clanID)];
                    case 2:
                        clan = _b.sent();
                        if (!clan || clan.owner.toString() !== user._id.toString())
                            return [2 /*return*/, res.send({ status: 100 })];
                        clan.description = description;
                        clan.website = website,
                            clan.minPopulation = minPopulation;
                        return [4 /*yield*/, clan.save()];
                    case 3:
                        _b.sent();
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    clanController.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, userId, owner, clan, user, _a, markets, recevieResource, index, market, key, value, userResource;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _id = req._id;
                        userId = req.params.id;
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 1:
                        owner = _b.sent();
                        if (!owner)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Clans.findById(owner.clan)];
                    case 2:
                        clan = _b.sent();
                        if (!clan || clan.owner.toString() !== owner._id.toString())
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Users.findById(userId)];
                    case 3:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Users.updateOne({ _id: user._id }, { $unset: { clan: 1 } })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, models_1.Castles.updateMany({ user: user._id }, { $unset: { clan: 1 } })];
                    case 5:
                        _b.sent();
                        _a = clan;
                        return [4 /*yield*/, models_1.Users.countDocuments({ clan: clan._id })];
                    case 6:
                        _a.members = _b.sent();
                        return [4 /*yield*/, clan.save()];
                    case 7:
                        _b.sent();
                        res.send({ status: 1 });
                        return [4 /*yield*/, models_1.Markets.find({ user: userId, status: 0 })];
                    case 8:
                        markets = _b.sent();
                        recevieResource = {
                            gold: 0,
                            iron: 0,
                            wood: 0,
                            food: 0
                        };
                        index = 0;
                        _b.label = 9;
                    case 9:
                        if (!(index < markets.length)) return [3 /*break*/, 12];
                        market = markets[index];
                        market.status = 2;
                        return [4 /*yield*/, market.save()];
                    case 10:
                        _b.sent();
                        for (key in market.offer) {
                            if (Object.prototype.hasOwnProperty.call(market.offer, key)) {
                                value = market.offer[key];
                                if (value) {
                                    recevieResource[key] += value;
                                }
                            }
                        }
                        _b.label = 11;
                    case 11:
                        index++;
                        return [3 /*break*/, 9];
                    case 12: return [4 /*yield*/, models_1.Resources.find({ user: userId })
                            .populate('type')];
                    case 13:
                        userResource = _b.sent();
                        userResource.forEach(function (resource) {
                            var resourceName = resource.type.name.toLowerCase();
                            var value = recevieResource[resourceName];
                            workerChangeResource_1.CHANGE_RESOURCE.push({
                                resource: resource._id,
                                newValue: value
                            });
                        });
                        (0, wsServices_1.changeUser)(userId);
                        return [2 /*return*/];
                }
            });
        });
    };
    return clanController;
}());
exports.default = clanController;
