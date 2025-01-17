import Test from '../models/test.model.js';
import Performance from '../models/performance.model.js';

// Create a new test (Admin only)
export const createTest = async (req, res) => {
  try {
    const { name, description, totalMarks, duration, subject, testDate, questions } = req.body;

    const newTest = new Test({
      name,
      description,
      totalMarks,
      duration,
      subject,
      testDate,
      questions,
    });

    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test' });
  }
};

// Get all tests (Students)
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('questions');
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests' });
  }
};

// Attempt a test (Student only)
export const attemptTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;  // `answers` will be an array of question answers
    const test = await Test.findById(testId).populate('questions');

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Calculate marks and time taken
    let marksObtained = 0;
    let timeTaken = 0;  // In minutes

    test.questions.forEach((question, index) => {
      const isCorrect = question.correctAnswer === answers[index];
      if (isCorrect) marksObtained += 4;
      else marksObtained-=1;  
    });

    const performance = new Performance({
      user: req.user.userId,
      test: testId,
      marksObtained,
      timeTaken,
      questionWiseStats: test.questions.map((question, index) => ({
        question: question._id,
        isCorrect: question.correctAnswer === answers[index],
        timeSpent: timeTaken, // Assuming time spent is tracked
      })),
    });

    await performance.save();
    res.status(200).json({ message: 'Test submitted successfully', performance });
  } catch (error) {
    res.status(500).json({ message: 'Error attempting test' });
  }
};
