const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if the email is already registered
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email already registered' });

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user object and save it to the database
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();

  // Return a success message once the user is registered
  res.json({ message: 'User registered successfully' });
};

// Log in an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email in the database
  const user = await User.findOne({ email });

  // If no user is found, return an error
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  // Generate a JWT token with the user's ID and role
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  // Filter the user data to send back (without sensitive information)
  const filteredUser = {
    userID: user.userID,
    name: user.name,
    email: user.email,
    role: user.role
  };

  // Send the token and the filtered user data back as a response
  res.json({ token, user: filteredUser });
};
