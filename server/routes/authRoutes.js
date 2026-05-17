import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Public routes - no authentication required
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes - require authentication
router.get('/me', authController.getCurrentUser);
router.post('/logout', authController.logout);

export default router;
