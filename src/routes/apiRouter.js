const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')
//const expressJwt = require('express-jwt')
//const validateJwt = expressJwt({ secret: 'mi-secreto', algorithm: ['HS256'] })


router.post('/register', apiController.createUser)
router.post('/login', apiController.loginUser)



module.exports = router