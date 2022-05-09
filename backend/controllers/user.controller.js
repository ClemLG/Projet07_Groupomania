// Imports

const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth.middleware')

// Import du model user
const User = require('../models/user.model')

// Récupération d'un utilisateur
exports.getOneUser = (req, res) => {
    //On récupère l'utilsateur dans la base de données
    User.findOne({
        // On liste les attributs à récupérer
        attributes: ["username", "id", "avatar", "email", "isAdmin"],
        // La destination  de récupération
        where: {id: req.params.id}
    })
        //Si récupération réussie
        .then(
            (user) => res.status(200).json(user),
        )
        // Sinon
        .catch(
            error => res.status(404).json({error}),
        )
}

// Récupération de tous les utilisateurs
exports.getAllUsers = (req, res) => {
    //On récupère les utlisateurs (sauf admin) dans la base de donnée
    User.findAll({
        attributes: ["username", "id", "avatar", "email"],
    })
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({error}))
}

// Modification du profil
exports.updateProfile = (req, res) => {
    try {
        console.log(req.body)
        User.update({
            username: req.body.username,
            avatar: req.body.avatar
        }, {
            where: {
                id: (req.params.id)
            }
        });

        return res.status(200).send({message: "Utilisateur modifié !"})
    } catch (err) {
        return res.status(500).json(err);
    }
}

// Désactivation du compte
exports.unregister = (req, res) => {
//On retrouve l'utilisateur dans la base de données
    User.findOne({where: {id: req.params.id}})
        //Si trouvé on supprime le compte de l'utilisateur dont l'id correspond à la requete
        .then(() => {
            User.destroy({where: {id: req.params.id}})
                .then((user) => res.status(200).json(user))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}