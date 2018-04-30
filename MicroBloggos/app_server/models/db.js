var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MicroBloggos');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var ct = require('./users')
var ct2 = require('./messages')

var userSchema = ct.schema();
var userModel = mongoose.model('users', userSchema);

var messageSchema = ct2.schema();
var messageModel = mongoose.model('messages', messageSchema);

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

exports.userInfoById = function (_id, callback) {
    userModel.findOne({_id: _id}, function (err, result) {
        callback(result);
    })
}

exports.allUserInfo = function (callback) {
    userModel.find({}, function (err, result) {
        callback(result);
    })
}

exports.editUser = function (name, email, password, _id, callback) {

    userModel.update({_id: _id}, {$set:
        {name: name, email: email, password: password}},
        function (err, result) {
        if (err) {
            console.log("something went wrong");
        }
        callback(result);
    })
}

exports.messageCreation = function (content, author_id, author_name) {
    var newMessage = new messageModel({
        content: content,
        author_id: author_id,
        author_name: author_name
    })
    return newMessage;
}

exports.messageInfo = function (author_id, callback) {
    messageModel.find({author_id: author_id}, null, {sort: {'date': -1}}, function (err, result) {
        callback(result);
    })
}

exports.messageFriends = function (friends, callback) {
    console.log(friends);
    messageModel.find({author_id: {$in: friends}}, null, {sort: {'date': -1}}, function (err, result) {
        callback(result);
    })
}

exports.deleteMessage = function (_id, callback) {
    messageModel.remove({_id: _id}, function (result) {
        callback(result);
    })
}

exports.updateMessage = function (_id, content, callback) {
    messageModel.update({_id: _id}, {$set: {content: content}}, function (err, result) {
            if (err) {
                console.log("something went wrong");
            }
            callback(result);
        })
}

exports.addFriend = function (friends, _id,  callback) {
    userModel.update ({_id: _id}, {$push: {friends: friends}}, function (err, result) {
        if (err) {
            console.log("Cannot add friend")
        }
        callback(result);
    });
}

exports.deleteFriend = function (friends, _id,  callback) {
    userModel.update ({_id: _id}, {$pull: {friends: friends}}, function (err, result) {
        if (err) {
            console.log("Cannot remove friend")
        }
        callback(result);
    });
}
