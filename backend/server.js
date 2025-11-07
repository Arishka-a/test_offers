// backend/server.js
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const offerRoutes = require('./routes/offers');
const logRoutes = require('./routes/logs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());

// === Маршруты ===
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Привет от Express + PostgreSQL!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/logs', logRoutes);

// 1. 404 — если ни один роут не сработал
app.use((req, res, next) => {
  res.status(404).json({ error: 'Роут не найден' });
});

// 2. Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// === Запуск ===
app.listen(PORT, () => {
  console.log(`Backend: http://localhost:${PORT}`);
  console.log(`API: /api/users, /api/offers, /api/logs, /api/auth/login`);
});