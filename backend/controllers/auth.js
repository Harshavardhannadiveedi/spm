import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import HOD from '../models/HOD.js';

export const register = async (req, res) => {
  try {
    const { fullName, rollNumber, email, password } = req.body;
    const existingStudent = await Student.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Roll number or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ fullName, rollNumber, email, password: hashedPassword });
    await student.save();
    const token = jwt.sign({ userId: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, userId: student._id, role: 'student', email, fullName });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrRollNumber, password } = req.body;
    let user = await Student.findOne({ $or: [{ email: emailOrRollNumber }, { rollNumber: emailOrRollNumber }] });
    let role = 'student';
    if (!user) {
      user = await HOD.findOne({ email: emailOrRollNumber });
      role = 'hod';
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id, role, email: user.email, fullName: user.fullName || user.email });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json({ userId: user._id, role: user.role, email: user.email, fullName: user.fullName || user.email });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    let user = await Student.findOne({ email });
    let role = 'student';
    if (!user) {
      user = await HOD.findOne({ email });
      role = 'hod';
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password' });
  }
};