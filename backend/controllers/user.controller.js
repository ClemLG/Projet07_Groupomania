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

// Modification du profil
exports.updateProfile = (req, res) => {
    try {
        let payload = {}
        if (req.body.username) {
            payload.username = req.body.username
        }
        if (req.file) {
            payload.avatar = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }
        User.update(payload, {
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
    console.log('je passe par le unregister')
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