// Imports
const express = require('express')
const userCtrl = require('../controllers/user.controller')
const auth = require("../middlewares/auth.middleware")

// Création du routeur
const router = express.Router()

// Définition des routes

router.get('/:id', auth, userCtrl.getOneUser)
router.get('/image/:id', auth, userCtrl.getProfilPicture)
router.put('/profile', auth, userCtrl.updateProfile)
router.get('/unregister/:id', userCtrl.unregister)



module.exports = router