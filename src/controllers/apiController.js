const { where } = require("sequelize")
const Users = require("../models/Users")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const LoginFails = require("../models/LoginFails")
const fs = require('fs')
const { validationResult } = require('express-validator')

//const validateToken = expressJwt({ "secret": 'mi-secreto', "algorithm": ['HS256'] })
const signToken = userId => jwt.sign({ userId }, 'mi-secreto')

const apiController = {
    createUser: async (req, res) => {
        try {
            let errors = validationResult(req)
            const userToCreate = { ...req.body }
            const user = await Users.findAll()
            const isUser = await user.filter(x => x.email === userToCreate.email)
            if (errors.isEmpty()) {
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
            } else {
                console.log(errors.array())
                return res.status(403).send('debes completar los campos requeridos')
            }
        }
        catch (err) {
            return res.send(err.message)
        }

    },
    loginUser: async (req, res) => {
        try {
            const errors = validationResult(req)
            const userToLogin = { ...req.body }
            const user = await Users.findAll()
            const isUser = await user.filter(x => x.email === userToLogin.email)
            if (errors.isEmpty()) {
                if (isUser == "") {
                    res.status(404).json({ mensaje: 'Usuario es inconrrecto' })
                } else {
                    if (isUser[0].accountStateId === 1) {
                        const match = await bcryptjs.compareSync(userToLogin.password, isUser[0].password)
                        if (!match) {
                            const userId = isUser[0].userId
                            const userFails = await LoginFails.findAll({ where: { userId: userId } })
                            if (userFails === " " || userFails.length < 5) {
                                await LoginFails.create({ userId: userId, failedDate: new Date() })
                                return res.status(403).json({ mensaje: 'credenciales incorrectas ' })
                            } else {
                                //Acá habráa que bloquear el estado del usuario
                                await Users.update({ accountStateId: 2 }, { where: { userId: userId } })
                                res.json(userFails)
                            }
                        } else {
                            const userId = isUser[0].userId
                            await LoginFails.destroy({ where: { userId: userId } })
                            const signed = signToken(userId)
                            req.session.userLogged = isUser[0]
                            const log = req.session.userLogged = isUser[0]
                            console.log(log)
                            return res.status(200).json({ signed: signed })
                            //Acá se podría agregar la parte de session y el token firmado
                        }
                    } else {
                        return res.status(403).json({ mensaje: 'Contactese con soporte' })
                    }
                }
            } else {
                console.log(errors.array())
                return res.status(403).send('debes completar los campos requeridos')
            }

        } catch (err) {
            res.json(err.message)
        }
    },
    modifyUser: async (req, res) => {
        try {
            const modifyId = req.params.id
            let errors = validationResult(req)
            const userToModify = { ...req.body }
            const user = await Users.findAll()
            const isUser = await user.filter(x => x.userId == modifyId)

            if (isUser == "") {
                //const modificatedUser = Users.update({ where: { userId: modifyId } })
                //const signed = signToken(modifyUser.userId)


                return res.status(403).send('Ese usuario no se encuentra registrado')

            } else {
                if (errors.isEmpty()) {
                    const modifyUser = {
                        name: userToModify.name,
                        lastName: userToModify.lastName,
                        userName: userToModify.userName,
                        email: isUser.email,//       <---------   arreglar este
                        password: bcryptjs.hashSync(req.body.password, 10),
                        roleId: userToModify.roleId,
                        accountStateId: userToModify.accountStateId,
                        userLocked: false,
                        createdDate: new Date()
                    }


                    await Users.update({ ...modifyUser }, { where: { userId: modifyId } })

                    return res.status(200).json(modifyUser)

                } else {
                    console.log(errors.array())
                    return res.status(403).send('debes completar los campos requeridos')
                }
            }

            //return res.status(200).json(modifyId)
        }
        catch (err) {
            return res.send(err.message)
        }

    }


}

module.exports = apiController