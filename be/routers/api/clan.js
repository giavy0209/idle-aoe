"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("controllers");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.route('/clan')
    .get(middleware_1.isAuth, controllers_1.clanController.get)
    .post(middleware_1.isAuth, controllers_1.clanController.post)
    .delete(middleware_1.isAuth, controllers_1.clanController.delete);
router.route('/clan/join/:id')
    .get(middleware_1.isAuth, controllers_1.clanController.getJoin)
    .post(middleware_1.isAuth, controllers_1.clanController.postJoin)
    .put(middleware_1.isAuth, controllers_1.clanController.putJoin)
    .delete(middleware_1.isAuth, controllers_1.clanController.deleteJoin);
router.route('/clan/:id')
    .get(middleware_1.isAuth, controllers_1.clanController.getDetail)
    .patch(middleware_1.isAuth, controllers_1.clanController.patchDetail);
router.route('/clan/user/:id')
    .delete(middleware_1.isAuth, controllers_1.clanController.deleteUser);
exports.default = router;
//# sourceMappingURL=clan.js.map