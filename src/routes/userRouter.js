const express = require('express');
const router = express.Router();
const { getUsersController, createUserController, getUserBy } = require('../controllers/userController');

router.get('/', getUsersController);
router.get('/:id', getUserBy);
router.post('/', createUserController);



module.exports = router;