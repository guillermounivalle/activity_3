// import  modules
const { Pool } = require('pg');
const bcryptjs = require('bcryptjs');

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

//get users
const getUsers = async (req, res) =>{
    const response = await pool.query('SELECT * FROM USERS');
    console.log('========= '+ JSON.stringify(response.rows));
    res.status(200).json(response.rows)
};

//get user by email and password
const getUserByEmailAndPassword = async (req, res)=>{
    const salt = bcryptjs.genSaltSync();
    const dataFind = {
        email: req.params.email,
        password: req.params.password
    };
    try {
        const response = await pool.query('SELECT * FROM users  A WHERE A.email = $1 ',
        [dataFind.email] );
        const isPassword =  bcryptjs.compareSync(dataFind.password, response.rows[0].password);
        const isActive = response.rows[0].active;
        if(isActive){
            if(isPassword){
                console.log("==== ", response.rows[0].password);
                console.log(isPassword);
                res.status(200).send(response.rows[0]);
                }else{
                    res.status(404).send('password is wrong');
            };  
        }else{
            res.status(404).send('user is not active');
        };
    } catch (error) {
        res.status(404).send(error)
    };
};

//Create users
const createdUser = async(req, res) => {
    const salt = bcryptjs.genSaltSync();

    const dataInsert = {
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, salt), 
        nickname: req.body.nickname, 
        birthdate: req.body.birthdate,
        active: req.body.active 
    };
    try {
        const response = await pool.query('INSERT INTO users(name, email, password, nickname, birthdate, active) VALUES($1, $2, $3, $4, $5, $6)', 
        [dataInsert.name, dataInsert.email, dataInsert.password, dataInsert.nickname, dataInsert.birthdate, dataInsert.active]);
        console.log(response);     
        res.status(200).send('user created');
    } catch (error) {
        res.status(404).send(error)
    };
};

module.exports = {
    getUsers,
    createdUser,
    getUserByEmailAndPassword
};