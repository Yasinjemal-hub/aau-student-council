import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';

// Import controllers
import * as dashboardController from '../controllers/dashboardController.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(requireAuth);
router.use(requireAdmin);

// ============================================
// FR-ADM-06: System Health Metrics
// ============================================

// GET /api/admin/dashboard/metrics - Get system health metrics
router.get('/metrics', dashboardController.getMetrics);

// GET /api/admin/dashboard/overview - Get dashboard overview summary
router.get('/overview', dashboardController.getDashboardOverview);

// ============================================
// FR-ADM-07: Audit Logs
// ============================================

// GET /api/admin/dashboard/audit-logs - Get paginated audit logs
router.get('/audit-logs', dashboardController.getAuditLogs);

// ============================================
// FR-ADM-13: Error Logs
// ============================================

// GET /api/admin/dashboard/error-logs - Get error logs for troubleshooting
router.get('/error-logs', dashboardController.getErrorLogs);

export default router;
