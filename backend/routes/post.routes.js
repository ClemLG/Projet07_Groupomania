const express = require('express')
const postCtrl = require('../controllers/post.controller')
const auth = require("../middlewares/auth.middleware")
const multer = require("../middlewares/multer-config")

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.post('/', auth, multer, postCtrl.createPost)
router.get('/', auth, postCtrl.getAllPosts)
router.put('/:id', auth, multer, postCtrl.updatePost)
router.delete('/:id', auth, multer, postCtrl.deletePost)


// LIKES
router.post('/:id/like', postCtrl.likePost)


// Export
module.exports = router