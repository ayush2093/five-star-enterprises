import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  contactType: {
    type: String,
    enum: ['general', 'support', 'business', 'feedback', 'technical'],
    default: 'general'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Inquiry', inquirySchema);
