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
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var mongoose_1 = require("mongoose");
var services_1 = require("services");
var authController = /** @class */ (function () {
    function authController() {
    }
    authController.auth = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, world, user, compare, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, world = _a.world;
                        username = username.trim();
                        password = password.trim();
                        if (!(0, mongoose_1.isValidObjectId)(world))
                            return [2 /*return*/, res.send({ status: 100 })];
                        if (!username || !password)
                            return [2 /*return*/, res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Users.findOne({ username: username, world: world })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 101 })];
                        compare = (0, bcrypt_1.compareSync)(password, user.password);
                        if (!compare)
                            return [2 /*return*/, res.send({ status: 102 })];
                        token = (0, jsonwebtoken_1.sign)({ _id: user._id }, global.Config.JWT);
                        res.send({
                            status: 1,
                            token: token
                        });
                        user.lastLogin = Date.now();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    authController.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, world, findWorld, isExits, hash_password, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, world = _a.world;
                        username = username.trim();
                        password = password.trim();
                        if (!(0, mongoose_1.isValidObjectId)(world))
                            return [2 /*return*/, res === null || res === void 0 ? void 0 : res.send({ status: 100 })];
                        if (!username || !password)
                            return [2 /*return*/, res === null || res === void 0 ? void 0 : res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Worlds.findById(world)];
                    case 1:
                        findWorld = _b.sent();
                        if (!findWorld)
                            return [2 /*return*/, res === null || res === void 0 ? void 0 : res.send({ status: 100 })];
                        return [4 /*yield*/, models_1.Users.findOne({ username: username, world: world })];
                    case 2:
                        isExits = _b.sent();
                        if (isExits)
                            return [2 /*return*/, res === null || res === void 0 ? void 0 : res.send({ status: 100 })];
                        hash_password = (0, bcrypt_1.hashSync)(password, 5);
                        return [4 /*yield*/, models_1.Users.create({
                                username: username,
                                password: hash_password,
                                world: world
                            })];
                    case 3:
                        user = _b.sent();
                        return [4 /*yield*/, services_1.castleService.create({ user: user._id, isCapital: true, isGhost: false, name: 'Capital' })];
                    case 4:
                        _b.sent();
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    authController.isValidJWT = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req._id;
                        return [4 /*yield*/, models_1.Users.findById(_id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.send({ status: 0 })];
                        res.send({ status: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    return authController;
}());
exports.default = authController;
//# sourceMappingURL=authController.js.map