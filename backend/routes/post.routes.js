const express = require('express')
const postCtrl = require('../controllers/post.controller')
const auth = require("../middlewares/auth.middleware")
const authAdmin = require('../middlewares/authAdmin.middleware')
const multer = require("../middlewares/multer-config")

// Création du routeur
const router = express.Router()

// CRUD
router.post('/posts', auth, multer, postCtrl.createPost)
router.get('/posts', auth, multer, postCtrl.getAllPosts)
router.get('/posts/:id', auth, postCtrl.getOnePost)
router.put('/posts/:id', auth, multer, postCtrl.updatePost)
router.delete('/posts/:id', auth, multer, postCtrl.deletePost)


// LIKES
router.post('/posts/:id/like', auth, postCtrl.likePost)


// Requete DELETE de l'administrateur pour supprimer un post
router.delete('/admin/delete/posts/:id', authAdmin, multer, postCtrl.adminDeletePost)

// Export
module.exports = router