import express from 'express';
import {
    createTest,
    getAllTests,
    attemptTest,
    editTest,
    addQuestionToTest,
    removeQuestionFromTest,
  } from '../controllers/test.controller.js';
import  fetchuser  from '../middleware/fetchuser.js';
import { isAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

// Admin routes
//authenticate change to fetchuser 
router.post('/create', fetchuser , isAdmin, createTest);
router.patch('/:testId/edit', fetchuser, isAdmin, editTest); // Edit test details
router.post('/:testId/questions', fetchuser, isAdmin, addQuestionToTest); // Add a question
router.delete('/:testId/questions/:questionId', fetchuser, isAdmin, removeQuestionFromTest); // Remove a question

// Student routes
router.get('/', fetchuser , getAllTests);

router.post('/attempt', fetchuser , attemptTest);


export default router;
