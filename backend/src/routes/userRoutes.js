const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes here require Authentication
router.use(authMiddleware);

// User can update their own password
router.put('/update-password', userController.updatePassword);

// Admin only routes
router.get('/', roleMiddleware(['Admin', 'Petugas', 'Pimpinan']), userController.getAllUsers);
router.post('/', roleMiddleware(['Admin']), userController.createUser);
router.put('/:id', roleMiddleware(['Admin']), userController.updateUser);
router.delete('/:id', roleMiddleware(['Admin']), userController.deleteUser);

module.exports = router;
