//import modules

var express = require('express');
var router = express.Router();
const { check } = require('express-validator');

//import controller
const {getUsers, createdUser} = require ('../controllers/user.controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({
    status: 'API Works'
  });
});

/* GET Users */
router.get('/users', getUsers);

/* POST user */
router.post('/signup',createdUser);


module.exports = router;