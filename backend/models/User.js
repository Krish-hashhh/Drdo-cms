const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hostel: { type: String },
  roomNumber: { type: String },
  phone: { type: String },
  role: {
    type: String,
    enum: ['user', 'admin', 'worker'],
    default: 'user'
  },
  category: {
    type: String,
    enum: ['Plumber', 'Electrician', 'Carpenter', 'Cleaner'],
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);
