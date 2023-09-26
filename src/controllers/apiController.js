const { where } = require("sequelize")
const Users = require("../models/Users")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const LoginFails = require("../models/LoginFails")
const fs = require('fs')


const apiController = {
    createUser: async (req, res) => {
        try {
            const userToCreate = { ...req.body }
            const user = await Users.findAll()
            const isUser = await user.filter(x => x.email === userToCreate.email)
            if (isUser == "") {
                const newUser = {
                    name: userToCreate.name,
                    lastName: userToCreate.lastName,
                    userName: userToCreate.userName,
                    email: userToCreate.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    roleId: userToCreate.roleId,
                    accountStateId: userToCreate.accountStateId,
                    userLocked: false,
                    createdDate: new Date()
                }
                Users.create(newUser)
                return res.status(200).send('Usuario creado con éxito')
            } else {
                return res.status(403).send('Ese usuario ya se encuentra registrado')
            }
        }
        catch (err) {
            return res.send(err.message)
        }

    },
    loginUser: async (req, res) => {
        try {
            const userToLogin = { ...req.body }
            const user = await Users.findAll()
            const isUser = await user.filter(x => x.email === userToLogin.email)

            if (isUser == "") {
                res.status(404).send('no se encontro')
            } else {
                const match = bcryptjs.compareSync(userToLogin.password, isUser[0].password)
                if (!match) {
                    const userId = isUser[0].userId
                    const userFails = await LoginFails.findAll({ where: { userId: userId } })
                    if (userFails === " " || userFails.length < 5) {
                        const fails = await LoginFails.create({ userId: userId, failedDate: new Date() })
                        return res.status(403).send('credenciales incorrectas ' + match)
                    } else {
                        //Acá habráa que bloquear el estado del usuario
                        res.json(userFails)
                    }
                } else {
                    const userId = isUser[0].userId
                    const userFails = await LoginFails.destroy({ where: { userId: userId } })
                    return res.status(200).json(isUser)
                    //Acá se podría agregar la parte de session y el token firmado
                }
            }
        } catch (err) {
            res.json(err.message)
        }
    }
}

module.exports = apiController