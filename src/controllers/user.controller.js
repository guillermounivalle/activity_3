// import postgres module
const { Pool } = require('pg');

//CALL variables config datbase
const {HOST_POSTGRES, DB_NAME, USER_POSTGRES, PSW_POSTGRES, DBPORT_POSTGRES} = require('../config');

const pool = new Pool({
    host: HOST_POSTGRES,
    user: USER_POSTGRES,
    password: PSW_POSTGRES,
    database: DB_NAME,
    port: DBPORT_POSTGRES
});


const getUsers = async (req, res) =>{
    const response = await pool.query('SELECT * FROM USERS');
    console.log('========= '+ JSON.stringify(response.rows));
    res.status(200).json(response.rows)
};

module.exports = {
    getUsers
};