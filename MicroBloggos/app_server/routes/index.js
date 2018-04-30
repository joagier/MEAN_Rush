var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentication');
var ctrlMess = require('../controllers/messages')
var cors = require('cors')

router.use(cors());


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/users', ctrlUsers.usersReadAll);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);
router.delete('/users/:userid', ctrlUsers.usersDeleteOne);

router.get('/profile/:userEmail', ctrlUsers.getSingleUser);
router.post('/editProfile', ctrlUsers.editProfile);

router.get('/members', ctrlUsers.getAllUsers);

router.post('/newMessage', ctrlMess.createMessage);
router.get('/userMessages/:author_id', ctrlMess.getUserMessages);
router.post('/deleteMessage', ctrlMess.deleteSingleMessage);
router.post('/updateMessage', ctrlMess.updateSingleMessage);

router.post('/addFriend', ctrlUsers.addFriend);
router.post('/deleteFriend', ctrlUsers.deleteFriend);
router.post('/friendsMessages', ctrlMess.getFriendsMessages);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;