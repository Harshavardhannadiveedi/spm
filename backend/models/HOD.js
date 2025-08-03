import mongoose from 'mongoose';

const hodSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'hod' },
});

export default mongoose.model('HOD', hodSchema);