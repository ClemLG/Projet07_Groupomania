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

// IMPORT DES ROUTES
const authRoute = require('./routes/auth.router')
const userRoute = require('./routes/user.router')
const postRoute = require('./routes/post.routes')
const commentRoute = require('./routes/comment.router')

//Enregistrement des routes
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

// Export de l'application
module.exports = app