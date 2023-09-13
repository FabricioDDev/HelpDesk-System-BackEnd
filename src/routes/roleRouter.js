const express = require('express');
const { getRolesController, createRolController } = require('../controllers/roleController');
const rolRouter = express.Router();

rolRouter.get('/', getRolesController)
rolRouter.post('/', createRolController )

module.exports = rolRouter