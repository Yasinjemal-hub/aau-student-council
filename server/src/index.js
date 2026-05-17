import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

// Import middleware
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin, requireCouncilOrAdmin } from '../middleware/rbac.js';

// Import routes
import authRoutes from '../routes/authRoutes.js';
import adminUserRoutes from '../routes/adminUserRoutes.js';
import adminDashboardRoutes from '../routes/adminDashboardRoutes.js';
import adminSettingsRoutes from '../routes/adminSettingsRoutes.js';
import adminModerationRoutes from '../routes/adminModerationRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet: Sets various HTTP headers for security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS: Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Express JSON: Parse JSON request bodies
app.use(express.json());

// Express URL-encoded: Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ============================================
// REQUEST LOGGING MIDDLEWARE
// ============================================

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AAU Student Council Backend'
  });
});

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

app.get('/api/public', (req, res) => {
  res.json({
    message: 'This is a public endpoint',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

app.use('/api/auth', authRoutes);

// ============================================
// AUTHENTICATED ROUTES (Require valid JWT)
// ============================================

app.get('/api/protected', requireAuth, (req, res) => {
  res.json({
    message: 'This is a protected endpoint',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ADMIN ROUTES (Require Administrator role)
// ============================================

app.get('/api/admin', requireAuth, requireAdmin, (req, res) => {
  res.json({
    message: 'This is an admin-only endpoint',
    user: req.user,
    role: req.userRole,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// COUNCIL/ADMIN ROUTES (Require Council Member or Administrator role)
// ============================================

app.get('/api/council', requireAuth, requireCouncilOrAdmin, (req, res) => {
  res.json({
    message: 'This endpoint is accessible by Council Members and Administrators',
    user: req.user,
    role: req.userRole,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ADMIN USER MANAGEMENT ROUTES
// ============================================

app.use('/api/admin/users', adminUserRoutes);

// ============================================
// ADMIN DASHBOARD ROUTES
// ============================================

app.use('/api/admin/dashboard', adminDashboardRoutes);

// ============================================
// ADMIN SETTINGS ROUTES
// ============================================

app.use('/api/admin/settings', adminSettingsRoutes);

// ============================================
// ADMIN MODERATION ROUTES
// ============================================

app.use('/api/admin/moderation', adminModerationRoutes);

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: err.name || 'Error',
    message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('=================================');
  console.log('AAU Student Council Backend Server');
  console.log('=================================');
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('=================================');
});

export default app;
