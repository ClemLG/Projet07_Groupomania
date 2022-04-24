// Imports
const express = require('express')
const userCtrl = require('../controllers/user.controller')

// Création du routeur
const router = express.Router()

// Définition des routes
router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.post('/forgot_password', userCtrl.forgotPassword)
router.get('/logout', userCtrl.logout)
router.get('/unregister/:user_id', userCtrl.unregister)
router.put('/profile', userCtrl.updateProfile)


//Exports
module.exports = router