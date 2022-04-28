//Import
const Sequelize = require('sequelize')

//Configurations pour la liaison avec la base de donnée
const sequelize = new Sequelize("groupomania", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

try {
   sequelize.authenticate()
    console.log('Connecté à la base de données MYSQL !')
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error)
}

// Export
module.exports = sequelize