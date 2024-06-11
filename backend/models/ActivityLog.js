const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    // default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
