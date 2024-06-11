const express = require('express');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

// Admin routes
router.use(auth); // Ensure auth middleware is applied first
router.use(role(['Admin'])); // Then apply role middleware

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/activity-log', async (req, res) => {
  try {
    const activityLog = await ActivityLog.find();
    res.status(200).json({ activityLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/admin-dashboard', async (req, res) => {
  try {
    const users = await User.find().populate('activityLog');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;