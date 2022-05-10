// Imports
const sequelize =  require('../config/db')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth.middleware')
const multer = require('../middlewares/multer-config')

// Import du package "file system" de Node pour acceder aux téléchargements et suppressions d'images
const fs = require('fs')

// Import du model Post
const Post = require('../models/post.model')
const User = require('../models/user.model')

// Création de post
exports.createPost = (req,res) => {
    console.log(req.headers.authorization)
    // On récupère l'userID dans le token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_SECRET_TOKEN");
    const userId = decodedToken.id;

    if(!req.file) {
        return Post.create({
            userId: userId,
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        })
            .then((post) => res.status(201).json({ message: "Post crée !"}))
            .catch((err) => res.status(500).json(err))
    }
}

// Récupération de tous les posts
exports.getAllPosts = (req,res) => {
    Post.findAll({
       order:[[
           'createdAt', 'DESC'
       ]],
       include:{
           model: User,
       }
    })
        .then(posts => {
            return res.status(200).json(posts)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}

// Récupération d'un post
exports.getOnePost = (req,res) => {
    console.log("Je passe dans getOnePost");
    res.status(200).send('Je passe dans getOnePost');
}

// Modification de post
exports.updatePost = (req,res) => {
    console.log("Je passe dans updatePost");
    res.status(200).send('Je passe dans updatePost');
}

// Suppression de post
exports.deletePost = (req,res) => {
    console.log("Je passe dans deletePost");
    res.status(200).send('Je passe dans deletePost');
}

// Like de post
exports.likePost = (req,res) => {
    console.log("Je passe dans likePost");
    res.status(200).send('Je passe dans likePost');
}


//ADMIN
exports.adminDeletePost = (req, res) => {}

