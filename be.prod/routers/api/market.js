"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("controllers");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.route('/market')
    .get(middleware_1.isAuth, controllers_1.marketController.get)
    .post(middleware_1.isAuth, controllers_1.marketController.post);
router.route('/market/clan')
    .get(middleware_1.isAuth, controllers_1.marketController.getClan);
router.route('/market/clan/:id')
    .put(middleware_1.isAuth, controllers_1.marketController.putClan);
router.route('/market/caravan')
    .post(middleware_1.isAuth, controllers_1.marketController.postCaravan);
exports.default = router;
