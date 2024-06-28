const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());

// Configure CORS
app.use(cors({
  credentials: true,
  origin: 'https://digitalalumniconnecter.vercel.app'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Handle preflight requests
app.options('*', cors());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(`Database connection error: ${err.message}`));

module.exports = app;