// Imports
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth.middleware')
const authAdmin = require('../middlewares/authAdmin.middleware')

// Import du model commentaire
const commentCtrl = require('../controllers/comment.controller')


router.post('/comments', commentCtrl.createComment)
router.get('/comments', auth, commentCtrl.getComments)
router.delete('/comments/:id', auth, commentCtrl.deleteComment)


// ADMIN
router.delete('')