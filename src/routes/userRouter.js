const express = require('express');
const userRouter = express.Router();

const { getUsersController, createUserController, userLogin, } = require('../controllers/userController');

userRouter.get('/', getUsersController)
userRouter.post('/create', createUserController)




module.exports = userRouter