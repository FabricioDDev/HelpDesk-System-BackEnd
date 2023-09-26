const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')


router.post('/register', apiController.createUser)
router.post('/login', apiController.loginUser)

module.exports = router