// Imports
const sequelize = require('../config/db')

// Import du model user
const User = require('../models/user.model')

// Modification du profil

exports.getOneUser = (req, res) => {
    //Récupérer l'utlisateur dans la base de données
    User.findOne({ where: { id: req.params.id }})
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }))
}
exports.getProfilePicture = (req, res) => {}


exports.updateProfile = (req, res) => {
    try {
        User.update({
            username: req.body.username
        }, {
            where: {
                id: (req.params.id)
            }
        });

        return res.status(200).send({
            message: "Nom d'utilisateur modifié !"
        })
    } catch (err) {
        return res.status(500).json(err);
    }
}

// Désactivation du compte
exports.unregister = (req, res) => {
//On retrouve l'utilisateur dans la base de données
    User.findOne({ where: { id: req.params.id }})
        //Si trouvé on supprime le compte de l'utilisateur dont l'id correspond à la requete
        .then(() => {
            User.destroy( { where: { id: req.params.id }})
                .then((user) => res.status(200).json(user)
                ({ message: 'Compte supprimé' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch (error => res.status(500).json({ error }))
}
console.log('testunregister')