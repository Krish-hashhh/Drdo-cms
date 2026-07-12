const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, email, password, hostel, room, phone, role, category } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      hostel,
      roomNumber: room,
      phone,
      role: role || 'user',
      category: role === 'worker' ? category : undefined,
    });

    await user.save();
    res.status(201).json({ message: "Registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    console.log("Login request body:", req.body); 

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User logging in:", user);


    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid credentials"); 
      return res.status(400).json({ message: "Invalid credentials" });
    }

   
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        category: user.category,
        hostel: user.hostel,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: {
        name: user.name,
        role: user.role,
        category: user.category,
        hostel: user.hostel,
      },
    });
  } catch (err) {
    console.error("Login crash:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token'); 
  return res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;
