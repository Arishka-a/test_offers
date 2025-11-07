// backend/controllers/offerController.js
const pool = require('../db');

// GET /api/offers
const getOffers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM offers ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('getOffers error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// POST /api/offers
const createOffer = async (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !price) {
    return res.status(400).json({ error: 'Название и цена обязательны' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO offers (title, description, price) VALUES ($1, $2, $3) RETURNING *',
      [title, description || null, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('createOffer error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// PUT /api/offers/:id
const updateOffer = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const result = await pool.query(
      `UPDATE offers 
       SET title = COALESCE($1, title), 
           description = COALESCE($2, description), 
           price = COALESCE($3, price)
       WHERE id = $4 
       RETURNING *`,
      [title, description, price, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Предложение не найдено' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('updateOffer error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// DELETE /api/offers/:id
// backend/controllers/offerController.js
const deleteOffer = async (req, res) => {
  console.log('ВЫЗВАН deleteOffer! ID:', req.params.id);
  const { id } = req.params;

  console.log('DELETE /offers/:id → id:', id); // ← ДОБАВЬ!

  try {
    const result = await pool.query(
      'DELETE FROM offers WHERE id = $1 RETURNING id',
      [id]
    );

    console.log('Удалено строк:', result.rowCount); // ← ДОБАВЬ!

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Предложение не найдено' });
    }

    res.json({ message: 'Удалено' });
  } catch (err) {
    console.error('Ошибка удаления:', err.message); // ← ДОБАВЬ!
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

module.exports = { 
    getOffers, 
    createOffer, 
    updateOffer, 
    deleteOffer 
};