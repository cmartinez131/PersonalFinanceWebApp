const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow cookies
}));
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// MongoDB Connection
const mongoURI = 'mongodb+srv://mongouser131:uUmuYG1pIraya6c7@cluster0.zeg3h02.mongodb.net/financeApp?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Insert demo user on startup
const insertDemoUser = async () => {
  const existingUser = await User.findOne({ email: 'demouser@example.com' });
  if (!existingUser) {
    const demoUser = new User({ email: 'demouser@example.com', password: 'demopassword' });
    await demoUser.save();
    console.log('Demo user created');
  }
};
insertDemoUser().catch(console.error);

// Routes
app.use('/api', userRoutes); // Use /api as the base path for user routes

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
