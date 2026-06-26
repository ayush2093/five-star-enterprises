import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional to support guest bookings
  },
  orderId: {
    type: String,
    unique: true,
    default: () => 'BKG-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
  },
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  tripDetails: {
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    returnDate: { type: Date },
    returnTime: { type: String },
    tripType: { type: String, enum: ['one-way', 'round-trip', 'hourly'], default: 'one-way' },
    hoursNeeded: { type: Number, default: 0 }
  },
  items: [{
    design: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Design',
      required: false
    },
    name: String,
    price: {
      type: Number,
      required: true
    },
    customization: mongoose.Schema.Types.Mixed
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'confirmed', 'completed', 'cancelled'],
    default: 'processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);
