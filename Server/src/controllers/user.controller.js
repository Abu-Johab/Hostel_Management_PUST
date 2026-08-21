// controllers/userController.js
import User from '../models/user.model.js';

/**
 * @desc   Register a new user
 * @route  POST /api/signup
 * @access Public
 */
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Save new user
    const newUser = new User({ email, password }); // hash password in real app
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
export{registerUser}