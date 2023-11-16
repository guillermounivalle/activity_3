// import  modules
const { Pool } = require('pg');

//CALL variables config datbase
const {HOST_POSTGRES, DB_NAME, USER_POSTGRES, PSW_POSTGRES, DBPORT_POSTGRES} = require('../config');

//Generate connection to database
const pool = new Pool({
    host: HOST_POSTGRES,
    user: USER_POSTGRES,
    password: PSW_POSTGRES,
    database: DB_NAME,
    port: DBPORT_POSTGRES
});

//get movies
const getMovies = async (req, res) =>{
    const response = await pool.query('SELECT * FROM movie');
    console.log('========= '+ JSON.stringify(response.rows));
    res.status(200).json(response.rows)
};

//list movies by user
const getMoviesbyUser = async (req, res) =>{
    const dataFind = {
        user_id: req.params.user_id,
    };
    try {
        const response = await pool.query('SELECT C.name AS PELICULA, C.release_date AS LANZAMIENTO, \
        C.url_imAge AS URL_IMAGEN FROM list_movie A INNER JOIN ( SELECT * FROM aux_list_movie    ) B \
        ON A.list_movie_id = B.list_movie_id INNER JOIN ( SELECT * FROM movie ) C \
        ON B.movie_id = C.movie_id INNER JOIN ( SELECT * FROM users	) D\
        ON D.user_id = a.user_id  WHERE A.user_id = $1', [dataFind.user_id]);
        console.log('========= '+ JSON.stringify(response.rows));
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(400).json(error);
    }
};


//Create movie
const createdMovie= async(req, res) => {
    const dataInsert = {
        name: req.body.name,
        release_date: req.body.release_date,
        url_image: req.body.url_image

    };
    try {
        const response = await pool.query('INSERT INTO movie(name, release_date, url_image)VALUES($1, $2, $3)', 
        [dataInsert.name, dataInsert.release_date, dataInsert.url_image]);
        console.log(response);     
        res.status(200).send('Movie created');
    } catch (error) {
        res.status(404).send(error)
    };
};





module.exports = {
    getMovies,
    createdMovie,
    getMoviesbyUser
};