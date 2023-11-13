// info configuration server

require('dotenv').config();

module.exports = {DB_NAME, PORT, API_NAME, API_VERSION, HOST_POSTGRES, USER_POSTGRES, 
    PSW_POSTGRES, DBPORT_POSTGRES} = process.env;
