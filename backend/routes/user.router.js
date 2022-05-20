// Imports
const express = require('express')
const userCtrl = require('../controllers/user.controller')
const auth = require("../middlewares/auth.middleware")
const multer = require("../middlewares/multer-config")


// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.get('/users/:id', auth, userCtrl.getOneUser)
router.get('/users', auth, userCtrl.getAllUsers)
router.put('/users/:id', auth, multer, userCtrl.updateProfile)
router.delete('/users/:id', userCtrl.unregister)

// Export
module.exports = router