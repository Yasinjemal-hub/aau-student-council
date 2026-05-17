import express from 'express';
import * as authController from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes - no authentication required
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes - require authentication
router.get('/me', requireAuth, authController.getCurrentUser);
router.post('/logout', requireAuth, authController.logout);

export default router;
