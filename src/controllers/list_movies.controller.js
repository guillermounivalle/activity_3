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

/*get List movies users */
const getListMovies = async (req, res) =>{
    const response = await pool.query('SELECT * FROM list_movie');
    console.log('========= '+ JSON.stringify(response.rows));
    res.status(200).json(response.rows)
};

//Create list movies
//the qualification and quantity_users_evaluates fields The data must be entered with a value of 0
//user_id field receives the id of the user who is creating the list.
const createdListMovie = async(req, res) => {
    const dataInsert = {
        name: req.body.name,
        created_date: req.body.created_date,
        qualification: req.body.qualification,
        quantity_users_evaluates: req.body.quantity_users_evaluates, 
        active: req.body.active,
        user_id: req.body.user_id
    };
    try {
        const response = await pool.query('INSERT INTO list_movie (name, created_date, qualification, quantity_users_evaluates, active, user_id)VALUES($1, $2, $3, $4, $5, $6 );', 
        [dataInsert.name, dataInsert.created_date, dataInsert.qualification, dataInsert.quantity_users_evaluates,
         dataInsert.active, dataInsert.user_id]);
        console.log(response);     
        res.status(200).send('list movies created');
    } catch (error) {
        res.status(404).send(error)
    };
};

//get user by email and password
/**
 * 
 * Here you get the list of movies that a user has. This allows you to have all the information 
 * to have the necessary data to view the lists of each user and use the data for other queries or operations.
 *  
 */
const getIdListMoviesbyUserId = async (req, res)=>{
    const dataFind = {
        user_id: req.params.userid,
    };
    try {
        const response = await pool.query('SELECT * FROM list_movie A WHERE A.user_id = $1 ',
        [dataFind.user_id] );
        const isActive = response.rows[0].active;
        if(isActive){
            res.status(200).send(response.rows);
        }else{
            res.status(404).send('list movie is not active');
        };
    } catch (error) {
        res.status(404).send(error)
    };
};


//update qualification list movies
/**
 * 
 * From the URL, the id of the list to be rated and the note are sent in the body. 
 * After a mathematical process, the qualification field is updated. 
 * 
 */
const updateQualificationListMovie = async (req, res)=>{
    const dataUpdate = {
        list_movie_id: req.body.list_movie_id,
        newQualification: req.body.qualification
    };
    try {
        const response = await pool.query('SELECT * FROM list_movie A WHERE A.list_movie_id = $1 ',
        [dataUpdate.list_movie_id] );
        const isActive = response.rows[0].active;
        const currentqualification =  parseFloat(response.rows[0].qualification);
        const currentquantityusers = parseInt(response.rows[0].quantity_users_evaluates);
        const newQuantityUsers = currentquantityusers + 1;
        console.log("Paso 1=========");
        if(isActive){
            console.log("Paso 2=========");
            const newQualification = averageQualification(currentqualification, currentquantityusers,
                parseFloat(dataUpdate.newQualification ));
            try {
                console.log("Paso 3=========");
                const response = await pool.query('UPDATE list_movie SET qualification = $1, quantity_users_evaluates = $2 where list_movie_id = $3',
                [newQualification,newQuantityUsers, dataUpdate.list_movie_id ]);
                res.status(200).send(response.rows);
            } catch (error) {
                res.status(404).send('the field do no update');
            }
        }else{
            res.status(404).send('list movie is not active');
        };
    } catch (error) {
        res.status(404).send(error)
    };
};

//Math Opartions

const averageQualification = (currentqualification, currentquantityusers, newqualification) => {
    console.log("1. == ", currentqualification, "2 == ", currentquantityusers, " 3  == ", newqualification)
    const qualification = currentqualification + newqualification;
    console.log("4. qualification == ", qualification);
    const quantityusers = currentquantityusers + 1;
    console.log("5. quantityusers == ", quantityusers);
    const averagequalification = qualification/quantityusers;
    console.log("6. averagequalification == ", averagequalification);
    return averagequalification;
};


module.exports = {
    createdListMovie,
    getIdListMoviesbyUserId,
    updateQualificationListMovie,
    getListMovies
};