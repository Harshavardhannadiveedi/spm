import express from 'express';
import { searchStudents } from '../controllers/users.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/search', protect, restrictTo('hod'), searchStudents);

export default router;