const express = require('express');
const { getLoginFailsController, createLoginFailController } = require('../controllers/loginFailController');
const loginFailRouter = express.Router();

loginFailRouter.get('/', getLoginFailsController)
loginFailRouter.post('/', createLoginFailController)

module.exports = loginFailRouter
