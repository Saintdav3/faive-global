const express = require('express');
const {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  uploadPortfolioMedia
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/media/upload', protect, (req, res) => {
  res.status(405).json({ success: false, message: 'Method not allowed' });
});
router.post('/media/upload', protect, upload.single('file'), uploadPortfolioMedia);

router.route('/').get(getPortfolios).post(protect, upload.single('heroMedia'), createPortfolio);
router
  .route('/:id')
  .get(getPortfolioById)
  .put(protect, upload.single('heroMedia'), updatePortfolio)
  .delete(protect, deletePortfolio);

module.exports = router;
