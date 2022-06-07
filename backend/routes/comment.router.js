// Imports
const express = require('express')
const commentCtrl = require('../controllers/comment.controller')
const auth = require('../middlewares/auth.middleware')
const multer = require('../middlewares/multer-config')

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.post('/', auth, commentCtrl.createComment)
router.get('/', auth, commentCtrl.getAllComments)
router.delete('/:id', auth, commentCtrl.deleteComment)


// Export
module.exports = router