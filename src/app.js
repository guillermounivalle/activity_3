/**
 * Imprt libraries and package
 */

const express = require('express');
const path = require('path');
const morgan = require('morgan');
 cors = require('cors');
const {DB_HOST, DB_NAME, PORT, API_NAME, API_VERSION} = require('./config');

//Express
const app = express();


//Config module
const config = require('./config');

//SET PORT LISTENING
app.set('port', process.env.PORT || PORT)

//init app connections
async function start (){
    try{
        //add port
        app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`));

    }catch(err){
        console.log('Error ===> ', err);
        process.exit(1);
    };
};


//URL BASE
const baseUrl = `/${API_NAME}/${API_VERSION}`

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//Routes
const indexRouter = require('./routes/index');

//instances routers
app.use(baseUrl, indexRouter);

start();
module.exports = app;