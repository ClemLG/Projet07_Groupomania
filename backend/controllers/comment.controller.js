// Imports
const sequelize = require('../config/db')
const auth = require('../middlewares/auth.middleware')

// Import des modèles
const Comment = require('../models/comment.model')


// Création d'un commentaire
exports.createComment = (req, res) => {
    console.log("Je passe dans createComment");
    //On récupère l'userId de celui qui commente dans le token
    const userId = req.bearerToken.id;
    console.log('user id du commentaire est: ' + userId)
    Comment.create({
        userId: userId,
        content: req.body.content,
        postId: req.params.postId
    })
        .then(() => res.status(201).json({ message: "commentaire crée!"}))
        .catch(error => res.status(400).json({ error }))
    console.log(req.body.content)
}

// Récupération de tous les commmentaires
exports.getAllComments = (req, res) => {
    console.log("Je passe dans getAllComments");
    // On utilise la methode "findAll" de notre modele pour permettre la recuperation de tous les posts
    Comment.findAll({
        // On précise qu'on veut récupérer les commentaires du plus récent au plus ancien
        where: {
            postId: req.params.postId
        },
        order: [['createdAt', 'DESC']]
    })
        .then(posts => {
            return res.status(200).json(posts)
        })
        .catch(error => {
            return res.status(500).json(error)
        })

}

// Suppression du commentaire
exports.deleteComment = async (req, res) => {
    console.log("Je passe dans deletecomment");
    console.log('id du token: ' + req.bearerToken.id)
    try {
        // Stockage de la table des Commentaires
        const comment = await Comment.findOne({where: {id: req.params.commentId}})
        console.log("id du commentaire: " + comment.userId)
        // Avant de supprimer, on vérifie que le commentaire appartient à l'utilisateur ou que celui-ci est admin
        if (comment.userId === req.bearerToken.id || req.bearerToken.isAdmin === true) {
            Comment.destroy({where: {id: comment.id}}, {truncate: true})
            res.status(200).json({message: 'Commentaire supprimé !'})
        } else {
            return res.status(401).json({message: "Vous ne disposez pas des droits nécéssaires !"})
        }
    } catch (error) {
        return res.status(500).json({error: "Erreur serveur !"})
    }
}

