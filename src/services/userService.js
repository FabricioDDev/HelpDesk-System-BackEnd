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

module.exports = {
    getAllUser,
    createUser
}