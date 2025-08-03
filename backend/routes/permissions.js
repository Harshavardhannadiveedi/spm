import express from 'express';
import { createPermission, getPermissions, getMyPermissions, updatePermissionStatus } from '../controllers/permissions.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, restrictTo('student'), createPermission);
router.get('/', protect, restrictTo('hod'), getPermissions);
router.get('/my-permissions', protect, restrictTo('student'), getMyPermissions);
router.put('/:id', protect, restrictTo('hod'), updatePermissionStatus);

export default router;