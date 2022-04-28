"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("controllers");
var router = (0, express_1.Router)();
router.route('/worlds')
    .get(controllers_1.worldsController.get);
exports.default = router;
//# sourceMappingURL=worlds.js.map