//Import
const mysql = require('mysql')

//Configurations pour la liaison avec la base de donnée
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'groupomania'
})

//Export
module.exports = connection