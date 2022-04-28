// Imports
const express = require('express')
const authCtrl = require('../controllers/auth.controller')

// Création du routeur
const router = express.Router()

// Définition des routes
router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.get('/logout', authCtrl.logout)
router.get('/unregister/:user_id', authCtrl.unregister)

//Exports
module.exports = router