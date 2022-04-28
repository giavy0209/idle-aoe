"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ResourceDataSchema = new mongoose_1.Schema({
    name: { type: String },
});
var ResourceDatas = (0, mongoose_1.model)('resource_datas', ResourceDataSchema);
exports.default = ResourceDatas;
//# sourceMappingURL=ResourceDatas.js.map