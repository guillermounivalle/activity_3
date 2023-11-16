//import modules

var express = require('express');
var router = express.Router();
const { check } = require('express-validator');

//import controller
const {getUsers, createdUser, getUserByEmailAndPassword} = require ('../controllers/user.controller');
const {createdListMovie, getIdListMoviesbyUserId, updateQualificationListMovie, getListMovies} = require ('../controllers/list_movies.controller');
const {getMovies, createdMovie, getMoviesbyUser} = require ('../controllers/movies.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({
    status: 'API Works'
  });
});

/* GET Users */
router.get('/users', getUsers);

/* GET Users by Email and password*/
router.get('/user/:email/:password', getUserByEmailAndPassword);

/* GET id list movies by user id*/
router.get('/listmovies/:userid', getIdListMoviesbyUserId);

/* GET Movies */
router.get('/list_movies', getListMovies);

/* GET Movies */
router.get('/movies', getMovies);

/* GET Movies */
router.get('/movies_user/:user_id', getMoviesbyUser);


/* POST user */
router.post('/signup',createdUser);

/* POST list movies */
router.post('/list_movies',createdListMovie);

/* POST list movies */
router.post('/movie',createdMovie);

/* UPDATE qualification list movies */
router.put('/qualificationlist', updateQualificationListMovie);


module.exports = router;