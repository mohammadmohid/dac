const express = require('express');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

// Admin route example
router.get('/users', auth, role(['Admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('activityLog');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user (admin only)
router.delete('/delete-user/:id', auth, role(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Remove user's activity logs
    await ActivityLog.deleteMany({ userId: req.params.id });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
