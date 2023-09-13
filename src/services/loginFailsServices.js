const LoginFails = require("../models/LoginFails")

const getAllLoginFails = async () => {
    const loginFails = await LoginFails.findAll()
    return loginFails
}

const createLoginFail = async (userId) => {

    try {
        const newLoginFail = await LoginFails.create({
            userId,
            failedDate: new Date()
        })
        return newLoginFail
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllLoginFails,
    createLoginFail
}