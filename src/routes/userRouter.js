const express = require('express');
const userRouter = express.Router();
const { getUsersController, createUserController } = require('../controllers/userController');

userRouter.get('/', getUsersController)
userRouter.post('/', createUserController)



module.exports = userRouter