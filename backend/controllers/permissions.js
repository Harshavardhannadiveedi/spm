import Permission from '../models/Permission.js';
import Student from '../models/Student.js';

export const createPermission = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const permission = new Permission({
      title,
      description,
      date,
      student: req.user._id,
      status: 'pending',
    });
    await permission.save();
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create permission' });
  }
};

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().populate('student', 'fullName rollNumber');
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch permissions' });
  }
};

export const getMyPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({ student: req.user._id });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch permissions' });
  }
};

export const updatePermissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const permission = await Permission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('student', 'fullName rollNumber');
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update permission' });
  }
};