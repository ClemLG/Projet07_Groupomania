const express = require('express')
const postCtrl = require('../controllers/post.controller')
const auth = require("../middlewares/auth.middleware")
const multer = require("../middlewares/multer-config")

// Création du routeur
const router = express.Router()

// CRUD
/*
router.post('/', auth, multer, postCtrl.createPost)
router.get('/', auth, )*/
