"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("controllers");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.route('/castles')
    .get(middleware_1.isAuth, controllers_1.castleController.get);
router.route('/castle')
    .get(middleware_1.isAuth, controllers_1.castleController.getOne);
router.route('/castle/ghost')
    .get(middleware_1.isAuth, controllers_1.castleController.getGhost);
exports.default = router;
