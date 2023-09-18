const { getAllUser, createUser, loginConection } = require("../services/userService")


const getUsersController = async (req, res) => {
    const users = await getAllUser()
    res.status(200).json(users)
}

const createUserController = async (req, res) => {
    const user = await createUser()

    res.status(200).json(user)
}
const userLogin = async (req, res) => {
    const tok = 'El usuario no existe'
    const ken = 'contraseña incorrecta'
    const userLog = { ...req.body }
    const user = await loginConection(userLog)
    if (user === tok) {
        return res.status(401).send(user)

    }
    if (user === ken) {
        return res.status(401).send(user)

    }
    res.status(200).json(user)
}

module.exports = {
    getUsersController,
    createUserController,
    userLogin
}