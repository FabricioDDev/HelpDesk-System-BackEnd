const { where } = require("sequelize")
const Users = require("../models/Users")


const getAllUser = async () => {
    const users = await Users.findAll()
    return users
}

const createUser = async () => {
    try {
        const newUser = await Users.create({
            name: 'pepe',
            lastName: 'rodriguez',
            userName: 'pepe10',
            email: 'pepe@mail.com',
            password: 'pepe123',
            roleId: 1,
            accountStateId: 2,
            userLocked: false,
            createdDate: new Date()
        })
        return newUser
    } catch (error) {
        console.log(error)
    }
}
const loginConection = async (userLog) => {
    try {
        const tok = 'El usuario no existe'
        const ken = 'contraseña incorrecta'
        const password = userLog.password
        const email = userLog.email
        const user = await Users.findAll()
        const match = user.filter(x => x.email === email)
        if (match != "") {
            if (match[0].password === password) {
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