import express from 'express';
import {
    createTest,
    getAllTests,
    attemptTest,
    editTest,
    addQuestionToTest,
    removeQuestionFromTest,
  } from '../controllers/test.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

// Admin routes
router.post('/create', authenticate, isAdmin, createTest);
router.patch('/:testId/edit', authenticate, isAdmin, editTest); // Edit test details
router.post('/:testId/questions', authenticate, isAdmin, addQuestionToTest); // Add a question
router.delete('/:testId/questions/:questionId', authenticate, isAdmin, removeQuestionFromTest); // Remove a question

// Student routes
router.get('/', authenticate, getAllTests); 

router.post('/attempt', authenticate, attemptTest);



export default router;
