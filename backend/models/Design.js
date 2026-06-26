import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional to allow guest designs to be saved if needed, or linked later
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  designType: {
    type: String,
    enum: ['custom', 'recommendation'],
    default: 'custom'
  },
  customization: {
    carModel: { type: String, required: true },
    category: { type: String, required: true },
    paintColor: { type: String, required: true },
    interiorStyle: { type: String, required: true },
    amenities: { type: [String], default: [] },
    chauffeurOption: { type: String, required: true }
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  imageUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp before saving
designSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Design', designSchema);
