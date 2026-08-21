import mongoose from 'mongoose';

const studentApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
    min: 0.0,
    max: 4.0,
  },
  semester: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th'],
    required: true,
  },
  hall: {
    type: String,
    enum: ['Shaheed Hall', 'Bangabandhu Hall'],
    required: true,
  },
  reason: {
    type: String,
    default: '',
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.model('StudentApplication', studentApplicationSchema);
