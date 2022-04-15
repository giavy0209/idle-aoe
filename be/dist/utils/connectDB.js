var mongoose = require('mongoose');
var _a = global.Config, MONGO_USER = _a.MONGO_USER, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_HOST = _a.MONGO_HOST, MONGO_PORT = _a.MONGO_PORT, MONGO_DB = _a.MONGO_DB;
var auth = MONGO_USER && MONGO_PASSWORD ? MONGO_USER + ':' + encodeURIComponent(MONGO_PASSWORD) + '@' : '';
var dbURI = "mongodb://localhost:27017/".concat(MONGO_DB);
console.log(dbURI);
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    console.log('connected db');
})
    .catch(function (e) {
    console.log(e);
});
