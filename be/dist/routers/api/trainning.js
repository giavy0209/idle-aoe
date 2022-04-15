"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("controllers");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.route('/trainning')
    .get(middleware_1.isAuth, controllers_1.trainningController.get)
    .post(middleware_1.isAuth, controllers_1.trainningController.post);
router.route('/training/cancel')
    .post(middleware_1.isAuth, controllers_1.trainningController.cancel);
router.route('/trainning-queue')
    .get(middleware_1.isAuth, controllers_1.trainningController.getTrainningQueue);
exports.default = router;
