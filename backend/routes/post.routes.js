const express = require('express')
const postCtrl = require('../controllers/post.controller')
const commentCtrl = require('../controllers/comment.controller')
const auth = require("../middlewares/auth.middleware")
const multer = require("../middlewares/multer-config")

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.post('/', auth, multer, postCtrl.createPost)
router.get('/', auth, postCtrl.getAllPosts)
router.get('/:id', auth, postCtrl.getOnePost)
router.put('/:id', auth, multer, postCtrl.updatePost)
router.delete('/:id', auth, multer, postCtrl.deletePost)



// Définition des routes CRUD commentaires
router.post('/:postId/comment', auth, commentCtrl.createComment)
router.get('/:postId/comment', auth, commentCtrl.getAllComments)
router.delete('/:postId/comment/:commentId', auth, commentCtrl.deleteComment)


// LIKES
router.post('/:id/like', auth, postCtrl.likePost)
router.post('/:id/unlike', auth, postCtrl.unlikePost)


// Export
module.exports = router