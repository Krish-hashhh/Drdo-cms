const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken,async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body,
      userId: req.user.id,
  });
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});


router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const complaints = await Complaint.find({ userId }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching user complaints:", err);
    res.status(500).json({ error: "Server error fetching complaints" });
  }
});

router.get('/admin', verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const adminHostel = req.user.hostel;
    if (!adminHostel) {
      return res.status(400).json({ message: "No hostel assigned to admin" });
    }

    const complaints = await Complaint.find({ hostel: adminHostel }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching admin complaints:", err);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/assigned/:category", verifyToken, async (req, res) => {
  try {
    const complaints = await Complaint.find({ assignedTo: req.params.category });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id/assign', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body;

  try {
    const updated = await Complaint.findByIdAndUpdate(
      id,
      { assignedTo, status: 'Assigned' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Assignment failed" });
  }
});

router.put('/:id/status', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Status update failed" });
  }
});



module.exports = router;
