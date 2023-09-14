const Users = require("../models/Users")

const getAllUser = async () => {
    try {
        
        const users = await Users.findAll();

        return users;

    } catch (err) {
        console.error(err);
    }
}

const getUserById = async (id) => {
    try {
        
        const user = await Users.findOne({
            where: {id},
        });
    
        return user;

    } catch (err) {
        console.error(err);
    }
}

const getUserByEmail = async (email) => {

    try {
        
        const user = await Users.findOne({
            where: {email},
        });
    
        return user;
        
    } catch (err) {
        console.error(err);
    }

}

const createUser = async (user) => {
    try {
        const newUser = await Users.create(user);

        return newUser;
    } catch (error) {
        console.error(error);
    }
}

const updateUser = (id, body) => {

}

const deleteUser = (id) => {

}

module.exports = {
    getAllUser,
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
}