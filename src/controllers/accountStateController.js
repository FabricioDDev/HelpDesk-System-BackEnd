const { getAllAccountStates, createAccountState } = require("../services/accountStatesService")

const getAccountStatesController = async (req, res) => {
    const accountStates = await getAllAccountStates()
    res.status(200).json(accountStates)
}

const createAccountStateController =  async (req, res) =>{
    const accountState = await createAccountState()

    res.status(200).json(accountState)
}

module.exports = {
    getAccountStatesController,
    createAccountStateController
}