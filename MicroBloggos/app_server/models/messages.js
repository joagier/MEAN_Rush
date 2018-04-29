var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MicroBloggos');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

exports.schema = function () {
    var messageSchema = new mongoose.Schema ({
        content: { type: String },
        author_id: { type: String },
        author_name: { type: String },
        hashtag: { type: Array, default: 0 },
        date: { type: Date, default: Date.now }
    });
    return messageSchema;
}