const express = require('express');
const {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote
} = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/').get(protect, getQuotes).post(upload.array('attachments', 4), createQuote);
router.route('/:id').get(protect, getQuoteById).put(protect, updateQuote).delete(protect, deleteQuote);

module.exports = router;
