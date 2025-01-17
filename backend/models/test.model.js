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
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    testDate: {
      type: Date,
      required: true,
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }],
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Expired'],
      default: 'Upcoming',
    },
  },
  { timestamps: true }
);

const Test = mongoose.model('Test', testSchema);

export default Test;
