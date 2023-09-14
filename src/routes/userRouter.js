const express = require('express');
const router = express.Router();
const { getUsersController, createUserController, getUserById } = require('../controllers/userController');

router.get('/', getUsersController);
router.get('/:id', getUserById);
router.post('/', createUserController);



module.exports = router;