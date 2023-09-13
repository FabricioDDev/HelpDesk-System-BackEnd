const { getAllRoles, createRol } = require("../services/rolService")

const getRolesController = async (req, res) => {

    const roles = await getAllRoles()
    res.status(200).json(roles)
}

const createRolController = async (req, res) => {

    const roles = await createRol()
    res.status(200).json(roles)
}

module.exports = {
    getRolesController,
    createRolController
}