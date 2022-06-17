// Imports
const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth.middleware')
const multer = require('../middlewares/multer-config')

// Import du package "file system" de Node pour acceder aux téléchargements et suppressions d'images
const fs = require('fs')

// Import du model Post
const Post = require('../models/post.model')
const User = require('../models/user.model')
const Comment = require('../models/comment.model')
const Like = require('../models/like.model')

// Création de post
exports.createPost = (req, res) => {
    console.log(req.headers.authorization)
// On récupère l'userID dans le token
    const userId = req.bearerToken.id;
    console.log('user id du post est: ' + userId)

    if (!req.file) {
        return Post.create({
            userId: userId,
            content: req.body.content,/*
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`*/
        })
            .then((post) => res.status(201).json({message: "Post crée !"}))
            .catch((err) => res.status(500).json(err))
    }
}

// Récupération de tous les posts
exports.getAllPosts = (req, res) => {
    console.log("Je passe dans getAllPosts");
    // On utilise la methode "findAll" de notre modele pour permettre la recuperation de tous les posts
    Post.findAll({
        // On précise qu'on veut récupérer les posts de plus récent au plus ancien
        order: [[Comment, 'createdAt', 'DESC']],
        include: [
            {
                model: User
            },
            {
                model: Comment,
                include: [User],
                order: [['createdAt', 'DESC']]
            },
            {
                model: Like
            },
        ]
    })
        .then(posts => {
            return res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error)
        })
}

// Récupération d'un post
exports.getOnePost = (req, res) => {
    Post.findOne({where: {id: req.params.id}, include: [
            {
                model: User
            },
            {
                model: Comment,
                include: [User],
                order: [['createdAt', 'DESC']]
            },
            {
                model: Like
            },
        ]})
        .then(post => {
            return res.status(200).json(post)
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error)
        })
}

// Suppression de post
exports.deletePost = async (req, res) => {
    console.log("Je passe dans deletePost");
    console.log('id du token: ' + req.bearerToken.id)
    try {
        // Stockage du schéma de données des Post.vue
        const post = await Post.findOne({where: {id: req.params.id}})
        console.log("id du post: " + post.userId)
        // Avant de supprimer, on vérifie que le post appartient à l'utilisateur ou que celui-ci est admin
        if (post.userId === req.bearerToken.id || req.bearerToken.isAdmin === true) {
            // On vérifie si il y a une image
            if (post.imageUrl) {
                // Si oui, on extrait le fichier et pour ca on recupere l'url du post et on le split autour de la chaine de caractères, donc le nom du fichier
                const filename = post.imageUrl.split("/images")[1]
                // Avec ce nom de fichier on appelle unlink pour suppr le fichier
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({where: {id: post.id}})
                    res.status(200).json({message: 'Post supprimé !'})
                })
                // Sinon on supprime quand meme le post sans image
            } else {
                Post.destroy({where: {id: post.id}}, {truncate: true})
                res.status(200).json({message: 'Post supprimé !'})
            }
        } else {
            return res.status(403).send({message: "Vous n'avez pas les droits nécessaires!"})
        }
    } catch (error) {
        return res.status(500).json({error: "Erreur Serveur"})
    }
}


// Like de post
exports.likePost = (req, res) => {
    // Pour la route READ = Ajout/suppression d'un like à un post
    // On prend le userID
    let userId = req.bearerToken.id
    // On prend l'id du post
    let postId = req.params.id

    Like.findAll({ where: {userId, postId} })
        .then(likes => {
            if (likes.length) {
                throw 'Post déjà liké'
            }
            return Like.create({
                userId,
                postId
            })
                .then((like) => res.status(201).json({message: "Like crée !"}))
        })
        .catch((error) => res.status(400).json({error}))
}

// Annulation de like de post
exports.unlikePost = (req, res) => {
    // Pour la route READ = Ajout/suppression d'un like à un post
    // On prend le userID
    let userId = req.bearerToken.id
    // On prend l'id du post
    let postId = req.params.id

    Like.findAll({ where: {userId, postId} })
        .then(likes => {
            if (!likes.length) {
                throw 'Post non liké'
            }
            const likesIds = likes.map(like => like.id)
            Like.destroy({ where: { id: likesIds } })
                .then((like) => res.status(201).json({message: "Like annulé !"}))
        })
        .catch((error) => res.status(400).json({error}))
}