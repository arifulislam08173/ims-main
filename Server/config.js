const mySql = require("mysql");

const config =  mySql.createConnection({
        user: "root",
        password: "",
        database: "ims-project",
        multipleStatements: true,
    })
    
    
module.exports = config;