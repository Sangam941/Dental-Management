import express from 'express';
import { loginUser, logoutUser } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// POST /auth/login — Admin login
router.post('/login', validate(loginSchema), loginUser);

// POST /auth/logout — Admin logout (protected)
router.post('/logout', protect, logoutUser);

export default router;
