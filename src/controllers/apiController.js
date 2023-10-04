const { where } = require("sequelize")
const Users = require("../models/Users")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const LoginFails = require("../models/LoginFails")
const fs = require('fs')

//const validateToken = expressJwt({ "secret": 'mi-secreto', "algorithm": ['HS256'] })
const signToken = userId => jwt.sign({ userId }, 'mi-secreto')

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
                const createdUser = Users.create(newUser)
                const signed = signToken(createdUser.userId)


                return res.status(200).send(signed)
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
                if (isUser[0].accountStateId === 1) {
                    const match = await bcryptjs.compareSync(userToLogin.password, isUser[0].password)
                    if (!match) {
                        const userId = isUser[0].userId
                        const userFails = await LoginFails.findAll({ where: { userId: userId } })
                        if (userFails === " " || userFails.length < 5) {
                            await LoginFails.create({ userId: userId, failedDate: new Date() })
                            return res.status(403).send('credenciales incorrectas ' + match)
                        } else {
                            //Acá habráa que bloquear el estado del usuario
                            await Users.update({ accountStateId: 2 }, { where: { userId: userId } })
                            res.json(userFails)
                        }
                    } else {
                        const userId = isUser[0].userId
                        await LoginFails.destroy({ where: { userId: userId } })
                        const signed = signToken(userId)
                        return res.status(200).send(signed)
                        //Acá se podría agregar la parte de session y el token firmado
                    }
                } else {
                    return res.status(403).send('Contactese con soporte')
                }
            }
        } catch (err) {
            res.json(err.message)
        }
    }


}

module.exports = apiController