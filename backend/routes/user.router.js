// Imports
const express = require('express')
const userCtrl = require('../controllers/user.controller')
const auth = require("../middlewares/auth.middleware")
const multer = require("../middlewares/multer-config")


// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.get('/:id', auth, userCtrl.getOneUser)
router.put('/:id', auth, multer, userCtrl.updateProfile)
router.delete('/:id', auth, userCtrl.unregister)

// Export
module.exports = router