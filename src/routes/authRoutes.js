const express = require('express');
const authControllers = require('../controllers/authController');
const auth = require('../middlewares/authMiddle')

const router = express.Router();

router.post('/signup',authControllers.signup);
router.post('/login', authControllers.login);
router.post('/logout', auth.auth, authControllers.logout);

module.exports = router;