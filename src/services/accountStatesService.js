const AccountStates = require("../models/AccountStates")


const getAllAccountStates = async () => {
    const accountStates = await AccountStates.findAll()
    return accountStates
}

const createAccountState = async () => {
    try {
        const newAccountState = await AccountStates.create({
            accountStateName: 'nametest accState'
        })
        return newAccountState
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllAccountStates,
    createAccountState
}