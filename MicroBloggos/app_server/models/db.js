var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MicroBloggos');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var ct = require('./users')

var userSchema = ct.schema();

var userModel = mongoose.model('users', userSchema);

exports.userCreation = function (name, email, password) {
    var newUser = new userModel({
        name: name,
        email: email,
        password: password
    })
    return newUser;
}

exports.userCheck = function (email, callback ) {
    userModel.count({email: email},function (err, result) {
        callback(result);
    })
}

exports.userInfo = function (email, callback) {
    userModel.findOne({email: email}, function (err, result) {
        callback(result);
    })
}