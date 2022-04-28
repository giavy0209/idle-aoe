"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("controllers");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.route('/auth')
    .post(controllers_1.authController.auth);
router.route('/signup')
    .post(controllers_1.authController.signup);
router.route('/valid-jwt')
    .get(middleware_1.isAuth, controllers_1.authController.isValidJWT);
exports.default = router;
//# sourceMappingURL=auth.js.map