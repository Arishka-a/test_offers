// backend/routes/offers.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getOffers, createOffer, updateOffer, deleteOffer } = require('../controllers/offerController');

// Защищённые роуты
router.get('/', authenticateToken, getOffers);
router.post('/', authenticateToken, createOffer);
router.put('/:id', authenticateToken, updateOffer);       
router.delete('/:id', authenticateToken, deleteOffer);    

module.exports = router;