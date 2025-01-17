import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Admin'], default: 'Student' },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    createdAt: { type: Date, default: Date.now },
  });
  
const User = mongoose.model('User', UserSchema);

export default User;


