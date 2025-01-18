import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Question from '../models/question.model.js';

const router = express.Router();

// Add a question to bookmarks
router.post('/add', async (req, res) => {
  const { userId, questionId } = req.body;

  try {
    // Validate IDs
    console.log("router call success");
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(questionId)) {
      console.log("error id npoty found");
      return res.status(400).json({ error: 'Invalid userId or questionId' });
    }
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    if (user.bookmarks.includes(questionId)) {
      return res.status(400).json({ error: 'Question already bookmarked' });
    }

    user.bookmarks.push(questionId);
    await user.save();
    console.log('Question added to bookmarks');
    res.status(200).json({ message: 'Question added to bookmarks', bookmarks: User.bookmarks });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove a question from bookmarks
router.post('/remove', async (req, res) => {
  const { userId, questionId } = req.body;

  try {
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ error: 'Invalid userId or questionId' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.bookmarks = user.bookmarks.filter(
      (bookmark) => bookmark.toString() !== questionId
    );
    await user.save();

    res.status(200).json({ message: 'Question removed from bookmarks', bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all bookmarked questions
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    const user = await User.findById(userId).populate('bookmarks');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
