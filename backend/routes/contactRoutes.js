import express from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// Get contact status
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Contact API is working',
    endpoint: 'POST /api/contact/send'
  });
});

// Post inquiry
router.post(
  '/send',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, email, subject, message, contactType } = req.body;

      // 1. Save to MongoDB
      const inquiry = new Inquiry({
        name,
        email,
        subject,
        message,
        contactType: contactType || 'general'
      });
      await inquiry.save();
      console.log(`✅ Inquiry from ${name} saved to database.`);

      // 2. Try sending email (Resilient)
      if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT || 587,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });

          const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_TO || 'info@thecarclub.in',
            subject: `Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nType: ${contactType || 'general'}\n\nMessage:\n${message}`,
            replyTo: email
          };

          await transporter.sendMail(mailOptions);
          console.log('✅ Notification email sent.');
        } catch (emailError) {
          console.error('⚠️ Nodemailer failed to send email (Inquiry saved anyway):', emailError.message);
        }
      } else {
        console.log('ℹ️ SMTP environment variables not configured. Skipping email dispatch.');
      }

      res.json({
        success: true,
        message: 'Your inquiry has been successfully received. We will contact you soon.',
        inquiryId: inquiry._id
      });
    } catch (error) {
      console.error('Error handling contact form:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process inquiry. Please try again later.'
      });
    }
  }
);

export default router;
