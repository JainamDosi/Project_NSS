import mongoose from 'mongoose';


const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: [{
      type: String
      
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
        enum: ['Physics', 'Chemistry', 'Math'], 
        required: true,
    },
    type: {
      type: String,
      enum: ['MCQ', 'Numerical'],
      required: true,
    },
    complexity: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
    },
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
 
//complexity easy medium hard 