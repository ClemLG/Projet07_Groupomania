// Imports
const express = require('express')
const userCtrl = require('../controllers/user.controller')
const auth = require("../middlewares/auth.middleware")
const multer = require("../middlewares/multer-config")


// Création du routeur
const router = express.Router()

// Définition des routes

router.get('/:id', auth, userCtrl.getOneUser)
router.get('/image/:id', auth, userCtrl.getProfilePicture)
router.put('/profile', auth, multer, userCtrl.updateProfile)
router.get('/unregister/:id', userCtrl.unregister)



module.exports = router