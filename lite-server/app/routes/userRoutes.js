const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
// User routes

router.post('/users', userController.createUser);
router.post('/users/login', userController.userLogin);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id',verifyToken, userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;