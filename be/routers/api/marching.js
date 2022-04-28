"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("controllers");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.route('/marching')
    .get(middleware_1.isAuth, controllers_1.marchingController.get)
    .post(middleware_1.isAuth, controllers_1.marchingController.attack);
router.route('/marching/return')
    .post(middleware_1.isAuth, controllers_1.marchingController.return);
exports.default = router;
//# sourceMappingURL=marching.js.map