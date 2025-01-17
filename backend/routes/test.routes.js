import express from 'express';
import { createTest, getAllTests, attemptTest } from '../controllers/test.controller.js';
import  fetchuser  from '../middlewares/fetchuser.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = express.Router();

// Admin routes
//authenticate change to fetchuser 
router.post('/create', fetchuser , isAdmin, createTest);

// Student routes
router.get('/', fetchuser , getAllTests);

router.post('/attempt', fetchuser , attemptTest);


export default router;
