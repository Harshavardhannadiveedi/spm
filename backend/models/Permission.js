import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
});

export default mongoose.model('Permission', permissionSchema);