import { supabase } from '../config/supabase.js';

/**
 * Role-based access control middleware that checks if the authenticated
 * user's role is 'Administrator' (FR-ADM-03).
 * 
 * This middleware must be used after requireAuth middleware.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const requireAdmin = async (req, res, next) => {
  try {
    // Ensure user is authenticated (requireAuth should have run first)
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    // Query the user_roles table to check if the user is an Administrator
    const { data: userRole, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', req.user.id)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred while checking user role'
      });
    }

    // Check if the user has Administrator role
    if (!userRole || userRole.role !== 'Administrator') {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Administrator access required'
      });
    }

    // Attach the user role to the request for use in subsequent middleware/routes
    req.userRole = userRole.role;
    
    next();
  } catch (error) {
    console.error('RBAC error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during authorization'
    });
  }
};

/**
 * Middleware to check if user is either Council Member or Administrator
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const requireCouncilOrAdmin = async (req, res, next) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    // Query the user_roles table
    const { data: userRole, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', req.user.id)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred while checking user role'
      });
    }

    // Check if the user has Council Member or Administrator role
    if (!userRole || !['Council Member', 'Administrator'].includes(userRole.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Council Member or Administrator access required'
      });
    }

    // Attach the user role to the request
    req.userRole = userRole.role;
    
    next();
  } catch (error) {
    console.error('RBAC error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during authorization'
    });
  }
};
