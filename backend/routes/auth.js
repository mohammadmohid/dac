const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

// Log activity function
const logActivity = async (userId, activity) => {
  try {
    const log = new ActivityLog({
      userId,
      activity,
      timestamp: new Date()
    });
    await log.save();

    await User.findByIdAndUpdate(userId, { $push: { activityLog: log._id } });
  } catch (err) {
    console.error(err);
  }
};

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ _id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Log login activity
    await logActivity(user._id, 'User logged in');
    res.cookie('token', token, { httpOnly: true }).json({ token });
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User registration
router.post('/register', async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = new User({ email, password, userType });
    await user.save();

    // Log login activity
    await logActivity(user._id, 'User registered account');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during user registration:', err);
    if (err.name === 'ValidationError') {
      const errorMessages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errorMessages.join(', ') });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete account route
router.delete('/delete-account', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.clearCookie('token');

    // Log account deletion activity
    await logActivity(req.user.userId, 'User deleted account');

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users with activity logs (admin only)
router.get('/user-activity-logs', auth, role(['Admin']), async (req, res) => {
  try {
    const users = await User.find().populate('activityLog');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Check authentication status
router.get('/check-auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;