const express = require('express');
const { getAccountStatesController, createAccountStateController } = require('../controllers/accountStateController');
const accountStateRouter = express.Router();

accountStateRouter.get('/', getAccountStatesController)
accountStateRouter.post('/', createAccountStateController)

module.exports = accountStateRouter