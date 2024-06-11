const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog'); 
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const router = express.Router();

const createToken = (user) => {
  return jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Log activity helper function
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


// Registration route
router.post('/register', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      userType
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true });

    // Log login activity
    await logActivity(user._id, 'User logged in');

    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

// Get all users and their activity logs
router.get('/user-activity-logs', async (req, res) => {
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
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;