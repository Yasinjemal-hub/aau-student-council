import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';

// Import controllers
import * as settingsController from '../controllers/settingsController.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(requireAuth);
router.use(requireAdmin);

// ============================================
// FR-ADM-08: System Settings Endpoints
// ============================================

// GET /api/admin/settings - Get all system settings
router.get('/', settingsController.getAllSettings);

// GET /api/admin/settings/:key - Get a single setting by key
router.get('/:key', settingsController.getSettingByKey);

// POST /api/admin/settings - Create a new system setting
router.post('/', settingsController.createSetting);

// PUT /api/admin/settings/:key - Update a system setting
router.put('/:key', settingsController.updateSetting);

// DELETE /api/admin/settings/:key - Delete a system setting
router.delete('/:key', settingsController.deleteSetting);

// POST /api/admin/settings/maintenance/toggle - Toggle maintenance mode
router.post('/maintenance/toggle', settingsController.toggleMaintenanceMode);

export default router;
