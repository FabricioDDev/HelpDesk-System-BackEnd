const fs = require('fs');
const path = require('path');
const Users = require('../models/Users');
const sequelize = Users.sequelize;
const { Op } = require('sequelize');

const profileAuthMiddleware = async (req, res, next) => {
    if (req.session.userLogged != "" && req.session.userLogged) {

        const user = req.session.userLogged
        const acepted = user.roleId
        console.log('----------->  ' + acepted)
        if (acepted === 1) {

            next()
        } else {
            return res.status(403).send('No tiene permisos de Administrador')
        }
    } else {

        return res.status(404).send('Debes iniciar sesion para poder crear usuarios')
    }

}

module.exports = profileAuthMiddleware;