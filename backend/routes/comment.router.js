// Imports
const express = require('express')
const commentCtrl = require('../controllers/comment.controller')
const auth = require('../middlewares/auth.middleware')
const authAdmin = require('../middlewares/authAdmin.middleware')
const multer = require('../middlewares/multer-config')

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.post('/comments', auth, commentCtrl.createComment)
router.get('/comments', auth, commentCtrl.getAllComments)
router.delete('/comments/:id', auth, commentCtrl.deleteComment)


// ADMIN
router.delete('/admin/delete/comments/:id', authAdmin, multer, commentCtrl.adminDeleteComment)

// Export
module.exports = router