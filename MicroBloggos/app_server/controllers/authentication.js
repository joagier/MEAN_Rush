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

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});*/

exports.register = function (req, res) {
    if (req.body.name && req.body.email && req.body.password && req.body.password_confirmation) {
        if (req.body.password === req.body.password_confirmation) {
            ct.userCheck(req.body.email, function(result) {
                if (result > 0) {
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
                    res.json(404);
                }
        });
    } else {
            res.status(400).send("Passwords don't match");
        }
}else {
        res.status(400).send("All fields are required");
    }
}

exports.login = function (req, res) {
    if (req.body.email && req.body.password && req.body.password_confirmation) {
        if (req.body.password === req.body.password_confirmation) {
            ct.userCheck(req.body.email, function(result) {
                if (result > 0) {
                    ct.userInfo(req.body.email, function (result) {
                        bcrypt.compare(req.body.password, result.password, function (err, result) {
                            if (result === true) {
                                res.sendStatus(200);
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
            res.json(404);
        }
    } else {
        res.status(400).send("All fields are required");
    }


}