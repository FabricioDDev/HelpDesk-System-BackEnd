const express = require('express');
const router = express.Router();
const { getUsersController, createUserController, getUserById, getUserByEmail } = require('../controllers/userController');

router.get('/', getUsersController);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.post('/', createUserController);



module.exports = router;