import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (requires authentication)
router.get('/profile', authenticate, getUserProfile);

export default router;
