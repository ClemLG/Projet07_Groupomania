// Imports
const express = require('express')
const userCtrl = require('../controllers/user.controller')
const auth = require("../Middlewares")

// Création du routeur
const router = express.Router()

// Définition des routes

router.get('/:id', userCtrl.getOneUser)
router.get('/image/:id', userCtrl.getProfilPicture)
router.put('/profile', userCtrl.updateProfile)



module.exports = router