const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin, getAdminProfile } = require('../controllers/authController');
const { protect, superadmin } = require('../middleware/auth');

router.post('/login', authAdmin);
router.post('/register', protect, superadmin, registerAdmin);
router.get('/profile', protect, getAdminProfile);

module.exports = router;
