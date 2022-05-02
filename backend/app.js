// Import
const express = require('express')
const sequelize = require('../backend/config/db')
const path = require('path')


//Enregistrement et synchronisation avec la base de données
sequelize.sync()
    .then(() => console.log('Connexion à la base de données MYSQL réussie !'))
    .catch((error) => console.log('Connexion à la base de données MYSQL échouée !' + error))

// Appel de la méthode "express" pour créer l'application
const app = express()

// Creation du middleware pour accèder au corps de la requête
app.use(express.json())

//MIDDLEWARE CORS HEADER
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

//Enregistrement des routes
app.use(require('./routes/auth.router'))

// Export de l'application
module.exports = app