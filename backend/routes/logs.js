// backend/routes/logs.js
const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM logs ORDER BY timestamp DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка в /api/logs:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;