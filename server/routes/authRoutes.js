const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../utils/validate');

router.post('/register', [authMiddleware, roleMiddleware(['Admin']), validate(registerSchema)], register);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

module.exports = router;