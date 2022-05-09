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

exports.createPost = (req,res) => {
    // On récupère l'userID dans le token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
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
exports.getOnePost = (req,res) => {
    console.log("Je passe dans getOnePost");
    res.status(200).send();
}
exports.updatePost = (req,res) => {}
exports.deletePost = (req,res) => {}
exports.likePost = (req,res) => {}


//ADMIN
exports.adminDeletePost = (req, res) => {}

