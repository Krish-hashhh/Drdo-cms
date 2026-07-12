const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
  },
  hostel: { type: String, required: true },
  block: { type: String },  
  block1: { type: String },   
  location: { type: String, required: true },
  roomNumber: { type: String },
  toilet: { type: String },
  corridor: { type: String },
  qt: { type: String },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" },
  assignedTo: { type: String, enum: ['Electrician', 'Plumber', 'Carpenter', 'Cleaner', null], default: null },
  createdAt: { type: Date, default: Date.now }
},{ timestamps: true } );

module.exports = mongoose.model('Complaint', complaintSchema);
