const express = require('express')
const postCtrl = require('../controllers/post.controller')
const auth = require("../middlewares/auth.middleware")
const multer = require("../middlewares/multer-config")

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.post('/posts', auth, multer, postCtrl.createPost)
router.get('/posts', auth, postCtrl.getAllPosts)
router.put('/posts/:id', auth, multer, postCtrl.updatePost)
router.delete('/posts/:id', auth, multer, postCtrl.deletePost)


// LIKES
router.post('/posts/:id/like', postCtrl.likeDislikePost)


// Export
module.exports = router