import Student from '../models/Student.js';
import Permission from '../models/Permission.js';

export const searchStudents = async (req, res) => {
  try {
    const { query } = req.query;
    const students = await Student.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { rollNumber: { $regex: query, $options: 'i' } },
      ],
    }).select('fullName rollNumber email');
    
    const studentsWithPermissions = await Promise.all(
      students.map(async (student) => {
        const permissions = await Permission.find({ student: student._id });
        return { ...student._doc, permissions };
      })
    );
    
    res.json(studentsWithPermissions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search students' });
  }
};