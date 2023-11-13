var express = require('express');
var router = express.Router();

const {getUsers} = require ('../controllers/user.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({
    status: 'API Works'
  });
});

router.get('/users', getUsers);

module.exports = router;