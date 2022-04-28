"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("controllers");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.route('/user')
    .get(middleware_1.isAuth, controllers_1.userController.get);
exports.default = router;
//# sourceMappingURL=user.js.map