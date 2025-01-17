import mongoose from 'mongoose';

const PerformanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },

  marksObtained: { type: Number, required: true },

  timeTaken: { type: Number, required: true },

  attemptedAt: { type: Date, default: Date.now },
  
  questionWiseStats: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      isCorrect: { type: Boolean, required: true },
      timeSpent: { type: Number, required: true },
    },
  ],
});

const Performance = mongoose.model('Performance', PerformanceSchema);

export default Performance;
