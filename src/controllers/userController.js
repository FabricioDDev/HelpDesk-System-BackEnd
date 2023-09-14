const { getAllUser, createUser } = require("../services/userService")


const getUsersController = async (req, res) =>{
    const users = await getAllUser()
    
    res.status(200).json({
        error: false,
        statusCode: 200,
        data: users
    })
}

const getUserById = async (req, res) => {
    const {id} = req.params

    const user = await getUserByEmail(id);

    return user ? res.json({
        error: false,
        sttusCode: 200,
        data: user
    }) : res.status(404).json({
        error: true,
        statusCode: 404,
        message: 'Invalid email address'
    });
}

const getUserByEmail = async (req, res) => {

    const {email} = req.params

    const user = await getUserByEmail(email);

    return user ? res.json({
        error: false,
        sttusCode: 200,
        data: user
    }) : res.status(404).json({
        error: true,
        statusCode: 404,
        message: 'Invalid email address'
    });
}

const createUserController = async (req, res) =>{

    const body = req.body;

    const user = await createUser(body);

    return user ? res.status(200).json({
        error: false,
        statusCode: 201,
        message: 'User created successfully'
    }) : res.status(400).json({
        error: true,
        statusCode: 400,
        message: 'Bad request'
    })
}

module.exports = {
    getUsersController,
    createUserController,
    getUserByEmail,
    getUserById
}