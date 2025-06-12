const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Protect all routes
router.use(auth);

// Routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router; 