const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login attempt for email:", email); // Add this line
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found"); // Add this line
        return res.status(400).json({ message: 'User not found' });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          req.session.userId = user._id;
          console.log("Login successful"); // Add this line
          res.json({ message: 'Login successful' });
        } else {
          console.log("Invalid password"); // Add this line
          res.status(400).json({ message: 'Invalid password' });
        }
      });
    } catch (error) {
      console.error("Login error:", error); // Add this line
      res.status(400).json({ message: error.message });
    }
  });

// Middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'You need to log in first' });
  }
}

// Profile route
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.json(user.profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
