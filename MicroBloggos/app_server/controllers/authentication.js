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

exports.register = function (req, res) {
    if (req.body.name && req.body.email && req.body.password && req.body.password_confirmation) {
        if (req.body.password === req.body.password_confirmation) {
            ct.userCheck(req.body.email, function(result) {
                if (result === 0) {
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if (err) {
                            res.json(404);
                        }
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            if (err) {
                                res.json(404);
                            }
                            var user = ct.userCreation(req.body.name, req.body.email, hash);
                            user.save(function (err, updatedTank) {
                                if (err) {
                                    res.json(404);
                                }
                                res.sendStatus(200);
                            });
                        });
                    });
                } else {
                    res.json("Email already exists")
                }
            });

        }else {
            res.status(400).send("Passwords don't match");
        }

    } else {
        res.status(400).send("All fields are required");
    }
}

exports.login = function (req, res) {
    if (req.body.email && req.body.password) {
            ct.userCheck(req.body.email, function(resultCheck) {
                if (resultCheck > 0) {
                    ct.userInfo(req.body.email, function (result) {
                        bcrypt.compare(req.body.password, result.password, function (err, resultBcrypt) {
                            if (resultBcrypt === true) {
                                res.status(200).json({result});
                            } else {
                                res.json(404);
                            }
                        })
                    })
                } else {
                    res.json(404);
                }
            });
    } else {
        res.status(400).send("All fields are required");
    }


}