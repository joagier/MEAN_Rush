var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var bcrypt = require('bcrypt');
var saltRounds = 10;
app.set('view engine', 'pug');
var cors = require('cors')


var ct = require('../models/db')

app.use(cors());


exports.createMessage = function (req, res) {
    if (req.body.content && req.body.author_id && req.body.author_name) {
        var message = ct.messageCreation(req.body.content, req.body.author_id, req.body.author_name);
        message.save(function (err) {
            console.log(message);
            if (err) {
                res.json(err);
            } else {
                res.json("Message created")
            }
        })
    } else {
        res.json("err2");
    }
}

exports.getUserMessages = function (req, res) {
    ct.messageInfo(req.params.author_id, function (result) {
        res.send(result);
    })
}

exports.deleteSingleMessage = function (req, res) {
    ct.deleteMessage (req.body._id, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.json("message deleted");
    })
}

exports.updateSingleMessage = function (req, res) {
    ct.updateMessage (req.body._id, req.body.content, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.json("Message updated");
    })
}