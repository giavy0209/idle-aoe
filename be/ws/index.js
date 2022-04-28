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
var socket_io_1 = require("socket.io");
var jsonwebtoken_1 = require("jsonwebtoken");
var server_1 = require("../server");
var models_1 = require("models");
var io = new socket_io_1.Server(server_1.default, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
var updateSocket = function (io, _id) { return __awaiter(void 0, void 0, void 0, function () {
    var ids, idsArray, _i, ids_1, id, update;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, io.in(_id + '').allSockets()];
            case 1:
                ids = _a.sent();
                idsArray = [];
                for (_i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                    id = ids_1[_i];
                    idsArray.push(id);
                }
                update = {
                    sockets: idsArray
                };
                if (idsArray.length === 0) {
                    update.lastOnline = Date.now();
                }
                return [4 /*yield*/, models_1.Users.findByIdAndUpdate(_id, update)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
io.use(function (socket, next) {
    var token = socket.handshake.auth.token;
    if (!token)
        return socket.disconnect();
    try {
        var payload = (0, jsonwebtoken_1.verify)(token, global.Config.JWT);
        var _id = payload._id;
        socket.data = { _id: _id };
        socket.join(_id + '');
    }
    catch (error) {
        socket.disconnect();
        return;
    }
    next();
});
io.on('connection', function (socket) {
    updateSocket(io, socket.data._id);
    socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            updateSocket(io, socket.data._id);
            return [2 /*return*/];
        });
    }); });
});
exports.default = io;
//# sourceMappingURL=index.js.map