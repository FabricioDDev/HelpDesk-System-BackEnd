const Roles = require("../models/Roles")

const getAllRoles = async () => {
    const roles = await Roles.findAll()
    return roles
}

const createRol = async () => {
    try {
        const newRol = await Roles.create({
            roleName: 'admin'
        })
        return newRol
    } catch (error) {
        console.log(error) 
    }
}

module.exports = {
    getAllRoles,
    createRol
}