import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';

// Import controllers
import * as moderationController from '../controllers/moderationController.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(requireAuth);
router.use(requireAdmin);

// ============================================
// FR-ADM-09: Content Categories Endpoints
// ============================================

// GET /api/admin/moderation/categories - Get all content categories
router.get('/categories', moderationController.getAllCategories);

// POST /api/admin/moderation/categories - Create a new content category
router.post('/categories', moderationController.createCategory);

// PUT /api/admin/moderation/categories/:categoryId - Update a content category
router.put('/categories/:categoryId', moderationController.updateCategory);

// DELETE /api/admin/moderation/categories/:categoryId - Delete a content category
router.delete('/categories/:categoryId', moderationController.deleteCategory);

// ============================================
// FR-ADM-10: Flagged Content Endpoints
// ============================================

// GET /api/admin/moderation/flagged - Get flagged content
router.get('/flagged', moderationController.getFlaggedContent);

// DELETE /api/admin/moderation/flagged/:contentId - Delete flagged content
router.delete('/flagged/:contentId', moderationController.deleteFlaggedContent);

// POST /api/admin/moderation/flagged/:contentId/approve - Approve flagged content
router.post('/flagged/:contentId/approve', moderationController.approveFlaggedContent);

export default router;
