import express from 'express';
import { createTest, getAllTests, attemptTest } from '../controllers/test.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

// Admin routes
router.post('/create', authenticate, isAdmin, createTest);

// Student routes
router.get('/', authenticate, getAllTests);

router.post('/attempt', authenticate, attemptTest);


export default router;
