const express = require('express');
const { getRolesController, createRolController } = require('../controllers/rolController');
const rolRouter = express.Router();

rolRouter.get('/', getRolesController)
rolRouter.post('/', createRolController )

module.exports = rolRouter