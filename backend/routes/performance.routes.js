import express from 'express';
import { getPerformanceByTest } from '../controllers/performance.controller.js';
import  fetchuser   from '../middleware/fetchuser.js';

const router = express.Router();

// Student route: Get performance for a specific test
router.get('/performance/:testId', fetchuser , getPerformanceByTest);

export default router;
