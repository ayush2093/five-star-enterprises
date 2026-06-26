import express from 'express';
import mongoose from 'mongoose';
import Design from '../models/Design.js';

const router = express.Router();

// Get all public/recent designs
router.get('/', async (req, res) => {
  try {
    const designs = await Design.find().populate('user', 'firstName lastName email').limit(50);
    res.json({ success: true, count: designs.length, designs });
  } catch (error) {
    console.error('Error fetching designs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch designs' });
  }
});

// Save a new design
router.post('/', async (req, res) => {
  try {
    const { name, description, price, customization, designType } = req.body;

    const designData = {
      name: name || 'Bespoke Ride Configuration',
      description: description || 'Custom vehicle configuration',
      designType: designType || 'custom',
      customization: customization || {},
      price: price || 0
    };

    // If logged in, associate with user
    if (req.user) {
      designData.user = req.user._id;
    }

    const newDesign = new Design(designData);
    await newDesign.save();

    res.status(201).json({
      success: true,
      message: 'Design saved successfully',
      design: newDesign
    });
  } catch (error) {
    console.error('Save design error:', error);
    res.status(500).json({ success: false, message: 'Failed to save configuration', error: error.message });
  }
});

// Get user's own designs
router.get('/my-designs', async (req, res) => {
  try {
    // If not logged in, return empty or check if they want to send guest configurations
    if (!req.user) {
      return res.json({ success: true, designs: [] });
    }

    const designs = await Design.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: designs.length, designs });
  } catch (error) {
    console.error('Error fetching user designs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch designs' });
  }
});

// Delete a saved design
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }

    const query = { _id: id };
    // If logged in, ensure owner deletes it. If guest, allow deleting (for testing)
    if (req.user) {
      query.user = req.user._id;
    }

    const deleted = await Design.findOneAndDelete(query);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Design not found or unauthorized' });
    }

    res.json({ success: true, message: 'Design deleted successfully' });
  } catch (error) {
    console.error('Delete design error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete design' });
  }
});

export default router;
