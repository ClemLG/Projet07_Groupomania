// Import
const express = require('express')

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
app.use(require('./routes/user.router'))

// Export de l'application
module.exports = app