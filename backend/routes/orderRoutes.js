import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get all orders (for admin overview/debugging)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstName lastName email').limit(100);
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

// Create a new booking (Order) - works for both guests and authenticated users
router.post('/', async (req, res) => {
  try {
    const { items, totalAmount, customerDetails, tripDetails, paymentStatus } = req.body;

    if (!customerDetails || !customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      return res.status(400).json({ success: false, message: 'Customer details (name, email, phone) are required' });
    }

    if (!tripDetails || !tripDetails.pickupLocation || !tripDetails.dropoffLocation || !tripDetails.pickupDate) {
      return res.status(400).json({ success: false, message: 'Trip details (pickup, dropoff, date) are required' });
    }

    const orderData = {
      items,
      totalAmount,
      customerDetails,
      tripDetails,
      paymentStatus: paymentStatus || 'pending'
    };

    // If logged in, associate with user
    if (req.user) {
      orderData.user = req.user._id;
    }

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      order: savedOrder,
      message: 'Booking placed successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place booking: ' + error.message,
      error: error.message
    });
  }
});

// Get user's bookings (or guest bookings if email matches query, as fallback)
router.get('/my-orders', async (req, res) => {
  try {
    const { email } = req.query;

    let query = {};
    if (req.user) {
      query.user = req.user._id;
    } else if (email) {
      query = { 'customerDetails.email': email };
    } else {
      // Unauthenticated and no email parameter -> return empty list
      return res.json({ success: true, orders: [] });
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
