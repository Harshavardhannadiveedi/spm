import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
});

export default mongoose.model('Student', studentSchema);