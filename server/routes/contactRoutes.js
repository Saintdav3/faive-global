const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getContacts).post(createContact);
router.route('/:id').get(protect, getContactById).put(protect, updateContact).delete(protect, deleteContact);

module.exports = router;
