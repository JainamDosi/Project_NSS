import express from 'express';
import { getPerformanceByTest } from '../controllers/performance.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Student route: Get performance for a specific test
router.get('/performance/:testId', authenticate, getPerformanceByTest);

export default router;
