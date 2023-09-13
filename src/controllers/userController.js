const { getAllUser, createUser } = require("../services/userService")


const getUsersController = async (req, res) =>{
    const users = await getAllUser()
    res.status(200).json(users)
}

const createUserController = async (req, res) =>{
    const user = await createUser()

    res.status(200).json(user)
}

module.exports = {
    getUsersController,
    createUserController
}