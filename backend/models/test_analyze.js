import mongoose from 'mongoose';
import User from './user.model.js'; // Assuming User model
import Test from './test.model.js'; // Assuming Test model
import Question from './question.model.js'; // Assuming Question model

const testResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test', // Reference to the Test model
      required: true,
    },
    responses: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', // Reference to the Question model
        required: true,
      },
      InputAnswer: {
        type: mongoose.Schema.Types.Mixed, // Can be a string or object based on question type (e.g., multiple choice answer, free text)
        required: true,
      },
      status: {
        type: String,
        enum: ['Not Attempted', 'Correct', 'Incorrect'],
        default: 'Not Attempted', // Default to 'Not Attempted' when not yet answered
        required: true,
      },
      timeSpent: {
        type: Number, // Time spent on the question in seconds
        required: true,
      },
    }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

const TestResponse = mongoose.model('TestResponse', testResponseSchema);

export default TestResponse;
