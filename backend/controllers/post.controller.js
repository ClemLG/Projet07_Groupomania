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
            imagePost: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`*/
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
        order: [['createdAt', 'DESC']],
        include: [User, Comment]
    })
        .then(posts => {
            return res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error)
        })
}

// Modification de post
exports.updatePost = (req, res) => {
    console.log("Je passe dans updatePost");
    console.log("id du bearerToken" + req.bearerToken.id)
    // On récupère le post qu'on souhaite modifier
    Post.findOne({where: {id: req.params.id}})
        .then(post => {
            // Avant de modifier, on vérifie que le post appartient à l'utilisateur
            if (post.userId === req.bearerToken.id) {
                // Si on trouve un nouveau fichier image, on modifie avec la nouvelle imageUrl
                const postObject = req.file ? {
                    ...req.body.post,
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    // Sinon on prends le corps de la requete et on modifie l'id de l'objet qu'on vient de créer pour correspondre à l'id des parametres de requete
                } : {...req.body}
                Post.update({...postObject}, {where: {id: req.params.id}})
                    .then(() => res.status(200).json({message: 'publication à jour !'}))
                    .catch(error => res.status(400).json({error}))
            } else {
                return res.status(403).json({message : "Vous n'avez pas les droits nécéssaires !"})
            }
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
    // Like présent dans le body
    let like = req.body.like
    // On prend le userID
    let userId = req.body.userId
    // On prend l'id de la sauce
    let postId = req.params.id

    // Si il s'agit d'un like
    if (like === 1) {
        // On push l'utilisateur et on incrémente le compteur de 1
        Post.update({id: postId}, {$push: {usersLiked: userId}, $inc: {likes: +1}})
            .then(() => res.status(200).json({message: "j'aime ajouté !"}))
            .catch((error) => res.status(400).json({error}))
    }

    // Si il s'agit d'annuler un like
    if (like === 0) {
        Post.findOne({id: postId})
            .then((post) => {
                // Si il s'agit d'annuler un like
                if (post.usersLiked.includes(userId)) {
                    // On pull l'utilisateur on incrémente le compteur de -1
                    Post.update({id: postId}, {$pull: {usersLiked: userId}, $inc: {likes: -1}})
                        .then(() => res.status(200).json({message: 'Like retiré !'}))
                        .catch((error) => res.status(400).json({error}))
                }
            })
            .catch((error) => res.status(404).json({error}))
    }
}

