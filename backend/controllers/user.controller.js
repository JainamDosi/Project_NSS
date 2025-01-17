import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, password' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!['Student', 'Admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log(req.body.email);
    
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    console.error(error.message);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ token, user });
    return token;
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('bookmarks');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};


export const logoutUser = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
    });
    
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out user' });
  }
}