//Import
const mysql = require('mysql')

//Configurations pour la liaison avec la base de donnée
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'groupomania'
});

//Export
module.exports.getDB = () => {
    return db
}