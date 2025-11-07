// backend/routes/users.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

// ← ПРАВИЛЬНО: деструктуризация
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

// Роуты
router.get('/', authenticateToken, getUsers);
router.post('/', authenticateToken, createUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;