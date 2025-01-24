import mongoose from 'mongoose';


const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: [{
      type: String,
      required: true,
    }],
    correctAnswer: {
      type: String,
      required: true,
    },
    image: {
      type: String, //cloudinary image  
      default: '',
    },
    subject: {
        type: String,
        enum: ['Physics', 'Chemistry', 'Mathematics'], 
        required: true,
    },
    type: {
      type: String,
      enum: ['MCQ', 'Numerical'],
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
 
//complexity easy medium hard 