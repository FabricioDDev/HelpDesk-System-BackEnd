const { getAllLoginFails, createLoginFail } = require("../services/loginFailsServices")

const getLoginFailsController = async (req, res) =>{
    const loginFails = await getAllLoginFails()
    res.status(200).json(loginFails)
}

const createLoginFailController = async (req, res) =>{
    const { userId } = req.body
    const loginFail = await createLoginFail(userId)

    res.status(200).json(loginFail)
}

module.exports = {
    getLoginFailsController,
    createLoginFailController
}