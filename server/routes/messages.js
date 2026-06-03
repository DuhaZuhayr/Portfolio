const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');
const checkDbConnection = require('../middleware/dbHealth');
const { sendContactEmail } = require('../utils/mailer');

// Rate limit for contact form: 5 messages per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many messages sent. Please try again later.' }
});

// POST submit contact message (public, rate-limited)
router.post('/',
  contactLimiter,
  checkDbConnection,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
      }

      // 1. Save to MongoDB
      const message = new Message(req.body);
      await message.save();
      console.log('✅ Message saved to MongoDB');

      // 2. Send email notification after MongoDB save
      try {
        await sendContactEmail(req.body);
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError.message);
      }

      res.status(201).json({ message: 'Message sent successfully! I\'ll get back to you soon.' });
    } catch (error) {
      console.error('❌ Contact form error:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// GET all messages (admin only)
router.get('/', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT mark message as read (admin only)
router.put('/:id/read', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE message (admin only)
router.delete('/:id', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
