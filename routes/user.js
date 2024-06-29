const express = require('express');
const router = express.Router();
const { authUser } = require('../middlewares/auth');
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  loginUser
} = require('../controllers/user');

// Create a new user
router.post('/createUser',createUser);

router.post('/loginUser',loginUser);
// Get a user by ID
router.get('/user/:id', getUserById);

// Get all users
router.get('/users', getAllUsers);

// Update a user by ID
router.put('/user/:id',updateUserById);

// Delete a user by ID
router.delete('/user/:id',deleteUserById);

module.exports = router;
