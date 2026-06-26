import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';

const router = express.Router();

let razorpay = null;
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (keyId && keySecret) {
  try {
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
    console.log('✅ Razorpay initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Razorpay:', error.message);
  }
} else {
  console.warn('⚠️ Razorpay keys not found. Running payment route in simulated mode.');
}

// Get payment API status
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: razorpay ? 'Razorpay Payment API is active' : 'Simulated Payment API is active',
    mode: razorpay ? 'live' : 'simulated',
    endpoints: {
      createOrder: 'POST /api/payment/create-order',
      verifyPayment: 'POST /api/payment/verify-payment'
    }
  });
});

// Create an order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    if (razorpay) {
      const options = {
        amount: Math.round(amount * 100), // Razorpay works in paise
        currency,
        receipt: `receipt_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);
      return res.json({
        success: true,
        order,
        mode: 'live'
      });
    } else {
      // Return simulated order
      const mockOrder = {
        id: `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        entity: 'order',
        amount: Math.round(amount * 100),
        amount_paid: 0,
        amount_due: Math.round(amount * 100),
        currency,
        receipt: `receipt_mock_${Date.now()}`,
        status: 'created',
        created_at: Math.floor(Date.now() / 1000)
      };

      return res.json({
        success: true,
        order: mockOrder,
        mode: 'simulated'
      });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// Verify payment
router.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ success: false, message: 'Missing payment parameters' });
    }

    if (razorpay) {
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", keySecret)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, message: "Invalid signature sent!" });
      }
    } else {
      // Verify simulated payment
      // If order is simulated, signature is just a mock string or accepted directly
      res.json({
        success: true,
        message: "Simulated payment verified successfully",
        mode: 'simulated'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

export default router;
