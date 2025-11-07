// backend/controllers/userController.js
const pool = require('../db');
const bcrypt = require('bcrypt');

// === 1. ОБЪЯВЛЯЕМ ВСЕ ФУНКЦИИ СНАЧАЛА ===

const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('getUsers error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const createUser = async (req, res) => {
  const { email, password, role = 'user' } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
      [email, hashed, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email уже занят' });
    }
    console.error('createUser error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;

  try {
    const updates = [];
    const values = [];
    let idx = 1;

    if (email) { updates.push(`email = $${idx++}`); values.push(email); }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.push(`password_hash = $${idx++}`); values.push(hashed);
    }
    if (role) { updates.push(`role = $${idx++}`); values.push(role); }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Нет данных для обновления' });
    }

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} RETURNING id, email, role, created_at`;
    values.push(id);

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('updateUser error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.json({ success: true, message: 'Пользователь удалён' });
  } catch (err) {
    console.error('deleteUser error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};