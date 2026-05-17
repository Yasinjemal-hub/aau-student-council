import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';

// Import controllers
import * as adminUserController from '../controllers/adminUserController.js';
import * as bulkImportController from '../controllers/bulkImportController.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(requireAuth);
router.use(requireAdmin);

// ============================================
// FR-ADM-01: User Management Endpoints
// ============================================

// GET /api/admin/users - Fetch all users with roles and profiles
router.get('/', adminUserController.getAllUsers);

// GET /api/admin/users/:userId - Fetch a single user by ID
router.get('/:userId', adminUserController.getUserById);

// PUT /api/admin/users/:userId/profile - Modify a user's profile
router.put('/:userId/profile', adminUserController.updateUserProfile);

// POST /api/admin/users/:userId/deactivate - Deactivate a user account
router.post('/:userId/deactivate', adminUserController.deactivateUser);

// POST /api/admin/users/:userId/reactivate - Reactivate a user account
router.post('/:userId/reactivate', adminUserController.reactivateUser);

// DELETE /api/admin/users/:userId - Delete a user account
router.delete('/:userId', adminUserController.deleteUser);

// ============================================
// FR-ADM-02: Role Management Endpoints
// ============================================

// POST /api/admin/users/:userId/role - Assign a role to a user
router.post('/:userId/role', adminUserController.assignRole);

// DELETE /api/admin/users/:userId/role - Revoke a role from a user
router.delete('/:userId/role', adminUserController.revokeRole);

// ============================================
// FR-ADM-05: Password Management Endpoints
// ============================================

// POST /api/admin/users/:userId/reset-password - Reset user's password
router.post('/:userId/reset-password', adminUserController.resetUserPassword);

// ============================================
// FR-ADM-04: Bulk Import Endpoints
// ============================================

// POST /api/admin/users/bulk-import - Bulk import users from CSV
router.post('/bulk-import', bulkImportController.bulkImportUsers);

// GET /api/admin/users/bulk-import/history - Get bulk import history
router.get('/bulk-import/history', bulkImportController.getBulkImportHistory);

export default router;
