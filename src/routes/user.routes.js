const express = require('express');
const { login, changePassword, forgotPassword } = require('../controllers/user.controller');

const router = express.Router();

router.post('/login', login);
router.post('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;