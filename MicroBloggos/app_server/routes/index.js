var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentication');
var cors = require('cors')

router.use(cors());


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/users', ctrlUsers.usersReadAll);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);
router.delete('/users/:userid', ctrlUsers.usersDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;