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
var workerChangeResource_1 = require("./workerChangeResource");
var secInHour = 3600;
var bonusSpeed = 5;
function workerResource() {
    return __awaiter(this, void 0, void 0, function () {
        var lastRun, resources, index, resource, userEXP, worldEXP, bonus, now, diffTime, percentDiffTimePerHour, generate, valueAfterDiff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastRun = Date.now();
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 5];
                    return [4 /*yield*/, models_1.Resources.find({})
                            .limit(100)
                            .sort({ lastUpdate: 1 })
                            .populate('building')
                            .populate({
                            path: 'user',
                            populate: {
                                path: 'world'
                            }
                        })];
                case 2:
                    resources = _a.sent();
                    for (index = 0; index < resources.length; index++) {
                        resource = resources[index];
                        userEXP = resource.user.exp;
                        worldEXP = resource.user.world.averageEXP;
                        bonus = 1;
                        if (userEXP && worldEXP && userEXP < worldEXP) {
                            bonus = (worldEXP - userEXP) / worldEXP * bonusSpeed;
                        }
                        now = Date.now();
                        diffTime = (now - new Date(resource.lastUpdate).getTime()) / 1000;
                        percentDiffTimePerHour = diffTime / secInHour;
                        generate = resource.building.value * resource.user.world.speed * bonus;
                        valueAfterDiff = generate * percentDiffTimePerHour;
                        workerChangeResource_1.CHANGE_RESOURCE.push({
                            resource: resource._id,
                            newValue: valueAfterDiff,
                            lastUpdate: now
                        });
                    }
                    if (!(Date.now() - lastRun < 5000)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, utils_1.waitfor)(5000 - (Date.now() - lastRun))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    lastRun = Date.now();
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = workerResource;
