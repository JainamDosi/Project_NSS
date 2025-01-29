import express from 'express';
import {
    createTest,
    getAllTests,
    editTest,
    addQuestionToTest,
    removeQuestionFromTest,
    deleteTest,
    getQuestions
  } from '../controllers/test.controller.js';
import  fetchuser  from '../middleware/fetchuser.js';

import { isAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

// Admin routes

//authenticate change to fetchuser 
router.post('/create',fetchuser, isAdmin, createTest);
router.patch('/:testId/edit', fetchuser, isAdmin, editTest); // Edit test details
router.get('/getAllTests', fetchuser, isAdmin, getAllTests); // Edit test details
router.post('/:testId/questions',fetchuser, isAdmin, addQuestionToTest); // Add a question
router.delete('/:testId/questions/:questionId', removeQuestionFromTest); // Remove a question
router.delete('/delete/:testId',fetchuser, isAdmin, deleteTest); // Delete a test




// Student routes
router.get('/',fetchuser,getAllTests);
router.get('/:testId/getQuestions',getQuestions); // Get all questions for a test  



export default router;
