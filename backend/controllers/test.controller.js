import Test from '../models/test.model.js';
import Performance from '../models/performance.model.js';
import Question from '../models/question.model.js';



export const createTest = async (req, res) => {
  try {
    const { name, description, totalMarks, duration, subject, testDate, questions } = req.body;

    // Create new questions if provided
    let questionIds = [];
    if (questions && questions.length > 0) {
      for (const questionData of questions) {
        const newQuestion = new Question(questionData); // Assuming each question has a valid structure
        const savedQuestion = await newQuestion.save();
        questionIds.push(savedQuestion._id);
      }
    }

    // Create the test
    const newTest = new Test({
      name,
      description,
      totalMarks,
      duration,
      subject,
      testDate,
      questions: questionIds, // Link created questions to the test
    });

    await newTest.save();

    res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error: error.message });
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



export const addQuestionToTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const questionData = req.body; // Question data should be provided in the request body

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Create a new question using the provided data
    const newQuestion = new Question(questionData);
    const savedQuestion = await newQuestion.save();

    // Add the created question to the test
    test.questions.push(savedQuestion._id);
    await test.save();

    res.status(201).json({
      message: 'Question created and added to test successfully',
      test,
      question: savedQuestion,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding question to test', error: error.message });
  }
};


export const editTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const updates = req.body; // Updates will contain the fields to modify (e.g., name, description)

    const updatedTest = await Test.findByIdAndUpdate(testId, updates, { new: true });

    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ message: 'Test updated successfully', test: updatedTest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating test', error: error.message });
  }
};


export const removeQuestionFromTest = async (req, res) => {
  try {
    const { testId, questionId } = req.params;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Remove the question from the test's questions array
    test.questions = test.questions.filter((q) => q.toString() !== questionId);

    await test.save();

    res.status(200).json({ message: 'Question removed from test successfully', test });
  } catch (error) {
    res.status(500).json({ message: 'Error removing question from test', error: error.message });
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
