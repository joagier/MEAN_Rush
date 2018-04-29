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

exports.usersReadAll = function (req, res) {
    res.send('NOT implemented: usersReadAll')
}

exports.usersUpdateOne = function (req, res) {
    res.send('NOT implemented: usersUpdateOne')
}

exports.usersDeleteOne = function (req, res) {
    res.send('NOT implemented: usersDeleteOne')
}

exports.getSingleUser = function (req, res) {
    ct.userInfo(req.params.userEmail, function (result) {
        res.json(result);
    })
}

exports.editProfile = function (req, res) {
    if (req.body.name && req.body.email && req.body.password && req.body.password_confirmation) {
        if (req.body.password === req.body.password_confirmation) {
            ct.userCheck(req.body.email, function(resultCheck) {
                if (resultCheck === 0) {
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if (err) {
                            res.json(404);
                        }
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            if (err) {
                                res.json(404);
                            }
                            ct.editUser(req.body.name, req.body.email, hash, req.body._id, function (resEdit) {
                                if (resEdit) {
                                    ct.userInfoById(req.body._id, function (result) {
                                        res.json({result})
                                    });
                                }

                            });
                        });
                    });
                } else {
                    res.json(404);
                }
            });

        }else {
            res.json(404);
        }

    } else {
        res.json(404);
    }

}

exports.getAllUsers = function (req, res) {
    ct.allUserInfo(function (result) {
        res.send(result);
    })
}