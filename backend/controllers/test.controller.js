import Test from '../models/test.model.js';
import Performance from '../models/performance.model.js';
import Question from '../models/question.model.js';



export const createTest = async (req, res) => {
  try {
    const { title, description, testDate, testTime } = req.body;

    // Create a combined date-time string using the testDate and testTime
    const combinedDateTime = `${testDate}T${testTime}:00`;  // This will give you '2025-01-23T04:48:00'

    // Parse it into a JavaScript Date object
    const testDateTime = new Date(combinedDateTime);

    // If the testDate is incorrect, we can log the Date object for debugging
    console.log('Parsed testDateTime:', testDateTime);

    // Now you can make sure the date is correctly converted to UTC if needed
    const utcTestDateTime = new Date(testDateTime.getTime() - testDateTime.getTimezoneOffset() * 60000);

    // Create a new Test instance
    const newTest = new Test({
      name: title,
      description,
      testDate: utcTestDateTime,
    });

    // Save the test to the database
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
    console.log('Test ID:', testId);
    const updates = req.body; 

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


export const deleteTest = async (req, res) => {
  try {
    const { testId } = req.params;

    // Find the test by ID
    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Optional: Remove associated questions from the database
    if (test.questions && test.questions.length > 0) {
      await Question.deleteMany({ _id: { $in: test.questions } });
    }

    // Delete the test
    await Test.findByIdAndDelete(testId);

    console.log('Test deleted successfully'); 
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting test', error: error.message });
  }
};


export const getQuestions = async (req, res) => {
  try {
      const { testId } = req.params;

      // Fetch the test by ID and populate the questions
      const test = await Test.findById(testId).populate('questions');

      if (!test) {
          return res.status(404).json({ error: 'Test not found' });
      }

      // Return the questions
      res.status(200).json({ questions: test.questions });
  } catch (error) {
      console.error('Error fetching test questions:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
