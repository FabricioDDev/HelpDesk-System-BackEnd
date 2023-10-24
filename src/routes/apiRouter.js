const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')
//const expressJwt = require('express-jwt')
//const validateJwt = expressJwt({ secret: 'mi-secreto', algorithm: ['HS256'] })
const profileAuthMiddleware = require('../middlewares/profileAuthMiddleware')
const { body } = require('express-validator')
const loginMiddleware = require('../middlewares/loginMiddleware')

const loginValidation = [
    body('email').notEmpty().withMessage('El campo de email es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
]
const registerValidation = [
    body('name').notEmpty().withMessage('El campo de nombre es requerido'),
    body('lastName').notEmpty().withMessage('El apellido es requerido'),
    body('userName').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('email').notEmpty().withMessage('El email es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('roleId').notEmpty().withMessage('El rol es requerido'),
    body('accountStateId').notEmpty().withMessage('La cuenta debe tener un estado'),
]
router.post('/register', profileAuthMiddleware, registerValidation, apiController.createUser)
router.post('/login', loginValidation, apiController.loginUser)



router.get('/server', (req, res) => {
    res.json({ mensaje: 'Conección al back por metodo GET' })
}) /* */
router.post('/server', (req, res) => {
    res.json({ mensaje: 'Conección al back por metodo POST' })
}) /* */
router.post('/modifyUser/:id', loginMiddleware, registerValidation, apiController.modifyUser)

module.exports = router