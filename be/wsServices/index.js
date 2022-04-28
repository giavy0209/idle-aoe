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
exports.changeMarketOffer = exports.changeMarching = exports.changeUnit = exports.changeTrainningQueue = exports.changeBuilding = exports.changeResources = exports.changeUser = void 0;
var models_1 = require("models");
var ws_1 = require("../ws");
function changeUser(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Users.findById(_id)
                        .populate('world clan')];
                case 1:
                    user = _a.sent();
                    ws_1.default.to(_id).emit('user', { data: user });
                    return [2 /*return*/];
            }
        });
    });
}
exports.changeUser = changeUser;
function changeResources(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var resources;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Resources.find({ user: _id }).populate('type').lean()];
                case 1:
                    resources = _a.sent();
                    ws_1.default.to(_id).emit('resources', { data: resources });
                    return [2 /*return*/];
            }
        });
    });
}
exports.changeResources = changeResources;
function changeBuilding(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Buildings.find({ user: _id })
                        .populate('building')];
                case 1:
                    data = _a.sent();
                    ws_1.default.to(_id).emit('building', { data: data });
                    return [2 /*return*/];
            }
        });
    });
}
exports.changeBuilding = changeBuilding;
function changeTrainningQueue(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Trainnings.find({ user: _id })
                        .populate('unit')];
                case 1:
                    data = _a.sent();
                    ws_1.default.to(_id).emit('trainning-queue', { data: data });
                    return [2 /*return*/];
            }
        });
    });
}
exports.changeTrainningQueue = changeTrainningQueue;
function changeUnit(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Units.find({ user: _id })
                        .populate('unit user')];
                case 1:
                    data = _a.sent();
                    ws_1.default.to(_id).emit('units', { data: data });
                    return [2 /*return*/];
            }
        });
    });
}
exports.changeUnit = changeUnit;
function changeMarching(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var marchingFrom, marchingTo, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Marchings.find({
                        user: _id,
                        status: { $in: [0, 1] }
                    })
                        .populate('user target units.unit')];
                case 1:
                    marchingFrom = _a.sent();
                    return [4 /*yield*/, models_1.Marchings.find({
                            target: _id,
                            status: { $in: [0] },
                            type: { $in: [3] }
                        })
                            .populate('user target units.unit')];
                case 2:
                    marchingTo = _a.sent();
                    data = __spreadArray(__spreadArray([], marchingFrom, true), marchingTo, true);
                    ws_1.default.to(_id).emit('marching', { data: data });
                    return [2 /*return*/];
            }
        });
    });
}
exports.changeMarching = changeMarching;
function changeMarketOffer(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Markets.find({ user: _id, status: 0 })
                        .sort({ _id: -1 })];
                case 1:
                    data = _a.sent();
                    ws_1.default.to(_id).emit('market-offer', { data: data });
                    return [2 /*return*/];
            }
        });
    });
}
exports.changeMarketOffer = changeMarketOffer;
//# sourceMappingURL=index.js.map