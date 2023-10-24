const fs = require('fs');
const path = require('path');
const Users = require('../models/Users');
const sequelize = Users.sequelize;
const { Op } = require('sequelize');

const loginMiddleware = async (req, res, next) => {
    if (req.session.userLogged != "" && req.session.userLogged) {
        const userId = req.params.id
        const user = req.session.userLogged
        const acepted = user.roleId
        console.log('----------->  ' + acepted)
        if (acepted === 1 || user.userId == userId) {

            next()
        } else {
            return res.status(403).send('No tiene permisos de Administrador')
        }
    } else {

        return res.status(404).send('Debes iniciar sesion para poder crear usuarios')
    }

}

module.exports = loginMiddleware;