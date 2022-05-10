// Imports
const sequelize = require('../config/db')
const auth = require('../middlewares/auth.middleware')
const authAdmin = require('../middlewares/authAdmin.middleware')
const jwt = require('jsonwebtoken')

// Import des modèles
const Comment = require('../models/comment.model')
const Post = require('../models/post.model')
const User = require('../models/user.model')


// Création d'un commentaire
exports.createComment = (req, res) => {
    console.log("Je passe dans createComment");
    res.status(200).send('Je passe dans createComment');
}

// Récupération de tous les commmentaires
exports.getAllComments = (req, res) => {
    console.log("Je passe dans getAllComments");
    res.status(200).send('Je passe dans getAllComments');
}

// Suppression du commentaire
exports.deleteComment = (req, res) => {
    console.log("Je passe dans deletecomment");
    res.status(200).send('Je passe dans deleteComment');
}


// ADMIN
exports.adminDeleteComment = (req, res) => {
    console.log("Je suis admin et je passe dans deletecomment");
    res.status(200).send('Je suis admin et je passe dans deleteComment');
}