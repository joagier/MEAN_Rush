var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/StartPitch');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

exports.schema = function () {
    var userSchema = new mongoose.Schema ({
        name: { type: String, required: true, index: { unique: true} },
        email: { type: String, required: true },
        password: { type: String, required: true },
        friends: { type: Array, default: 0},
        blacklist: {type: Array, default: 0},
        messages: {type: Array, default: 0}
    });
    return userSchema;
}