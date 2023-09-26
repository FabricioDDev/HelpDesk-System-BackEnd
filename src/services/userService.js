const { where } = require("sequelize")
const Users = require("../models/Users")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const getAllUser = async () => {
    const users = await Users.findAll()
    return users
}

// const createUser = async () => {
//     try {
//         const newUser = await Users.create({
//             name: 'pepe',
//             lastName: 'rodriguez',
//             userName: 'pepe10',
//             email: 'pepe@mail.com',
//             password: 'pepe123',
//             roleId: 1,
//             accountStateId: 2,
//             userLocked: false,
//             createdDate: new Date()
//         })
//         return newUser
//     } catch (error) {
//         console.log(error)
//     }
// }
const createUser = async (userCreate) => {
    try {
        const allUser = await Users.findAll()
        const isUser = await allUser.filter(x => x.email === userCreate.email)
        if (isUser.userName !== undefined) {
            console.log(isUser, userCreate.email)
            const newUser = "el usuario ya esta registrado"
            return newUser
        } else {


            const newUser = await Users.create(
                {
                    name: userCreate.name,
                    lastName: userCreate.lastName,
                    userName: userCreate.userName,
                    email: userCreate.email,
                    password: bcryptjs.hashSync(userCreate.password, 10),
                    roleId: userCreate.roleId,
                    accountStateId: userCreate.accountStateId,
                    userLocked: false,
                    createdDate: new Date()
                }
            )
            return newUser
        }

    } catch (err) {
        console.log(err.message)
        return "Error"
    }
}
const loginConection = async (userLog) => {
    try {
        const tok = 'El usuario no existe'
        const ken = 'contraseña incorrecta'
        // const password = userLog.password
        const email = userLog.email
        const user = await Users.findAll()
        const match = user.filter(x => x.email === email)
        if (match != "") {
            let isMatch = bcryptjs.compareSync(userLog.password, match[0].password)
            if (isMatch) {
                return match[0]
            } else {

                return match[0] = ken
            }
        } else {
            return tok
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUser,
    createUser,
    loginConection,
}