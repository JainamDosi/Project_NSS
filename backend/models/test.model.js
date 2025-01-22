import mongoose from 'mongoose';
import Question from './question.model.js';

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
      default: 300,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
      default: 180,
    },
    testDate: {
      type: Date,
      required: true,
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }],
  },
  { timestamps: true }
);

const Test = mongoose.model('Test', testSchema);

export default Test;
