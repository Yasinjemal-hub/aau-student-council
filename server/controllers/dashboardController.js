import { supabase } from '../config/supabase.js';

/**
 * FR-ADM-06: Get system health metrics
 * Returns total active users, pending feedback submissions, and recent error rates
 */
export const getMetrics = async (req, res) => {
  try {
    // Get total active users (not banned)
    const { count: totalUsers, error: usersError } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact', head: true });

    if (usersError) {
      console.error('Error fetching user count:', usersError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch user metrics'
      });
    }

    // Get count by role
    const { data: roleCounts, error: roleError } = await supabase
      .from('user_roles')
      .select('role');

    if (roleError) {
      console.error('Error fetching role counts:', roleError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch role metrics'
      });
    }

    const roleDistribution = {
      'General Student': 0,
      'Council Member': 0,
      'Administrator': 0
    };

    roleCounts.forEach(user => {
      if (roleDistribution.hasOwnProperty(user.role)) {
        roleDistribution[user.role]++;
      }
    });

    // Get pending feedback submissions (assuming a feedback table exists)
    // For now, we'll return a placeholder
    const pendingFeedback = 0;

    // Get recent audit logs to calculate error rates
    const { data: recentAuditLogs, error: auditError } = await supabase
      .from('audit_logs')
      .select('action, created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (auditError) {
      console.error('Error fetching audit logs:', auditError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch audit metrics'
      });
    }

    // Calculate error rate (actions with 'ERROR' in the action name)
    const errorActions = recentAuditLogs.filter(log => 
      log.action.includes('ERROR') || log.action.includes('FAIL')
    );
    const errorRate = recentAuditLogs.length > 0 
      ? (errorActions.length / recentAuditLogs.length) * 100 
      : 0;

    // Get recent activity (last 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: recentActivity, error: activityError } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', twentyFourHoursAgo);

    if (activityError) {
      console.error('Error fetching recent activity:', activityError);
    }

    res.status(200).json({
      success: true,
      data: {
        total_users: totalUsers || 0,
        role_distribution: roleDistribution,
        pending_feedback: pendingFeedback,
        error_rate: parseFloat(errorRate.toFixed(2)),
        recent_activity_24h: recentActivity || 0,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in getMetrics:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching metrics'
    });
  }
};

/**
 * FR-ADM-07: Get paginated audit logs
 */
export const getAuditLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const action = req.query.action;
    const entityType = req.query.entity_type;
    const userId = req.query.user_id;

    // Build query
    let query = supabase
      .from('audit_logs')
      .select(`
        id,
        user_id,
        action,
        entity_type,
        entity_id,
        old_values,
        new_values,
        ip_address,
        user_agent,
        created_at,
        profiles (
          full_name,
          email,
          student_id
        )
      `, { count: 'exact' });

    // Apply filters
    if (action) {
      query = query.ilike('action', `%${action}%`);
    }
    if (entityType) {
      query = query.eq('entity_type', entityType);
    }
    if (userId) {
      query = query.eq('user_id', userId);
    }

    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: auditLogs, error, count } = await query;

    if (error) {
      console.error('Error fetching audit logs:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch audit logs'
      });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    res.status(200).json({
      success: true,
      data: auditLogs,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error in getAuditLogs:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching audit logs'
    });
  }
};

/**
 * FR-ADM-13: Get error logs
 * This endpoint allows admins to view and manage system error logs for troubleshooting
 */
export const getErrorLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const severity = req.query.severity; // low, medium, high, critical
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    // Build query for error logs (filtering audit logs for error-related actions)
    let query = supabase
      .from('audit_logs')
      .select(`
        id,
        user_id,
        action,
        entity_type,
        entity_id,
        old_values,
        new_values,
        ip_address,
        user_agent,
        created_at,
        profiles (
          full_name,
          email,
          student_id
        )
      `, { count: 'exact' });

    // Filter for error-related actions
    query = query.or('action.ilike.%ERROR%,action.ilike.%FAIL%,action.ilike.%EXCEPTION%');

    // Apply date filters
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: errorLogs, error, count } = await query;

    if (error) {
      console.error('Error fetching error logs:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch error logs'
      });
    }

    // Categorize errors by severity
    const categorizedLogs = errorLogs.map(log => {
      let severity = 'low';
      const action = log.action.toLowerCase();
      
      if (action.includes('critical') || action.includes('fatal')) {
        severity = 'critical';
      } else if (action.includes('high') || action.includes('security')) {
        severity = 'high';
      } else if (action.includes('medium') || action.includes('warning')) {
        severity = 'medium';
      }

      return {
        ...log,
        severity
      };
    });

    // Apply severity filter if provided
    const filteredLogs = severity 
      ? categorizedLogs.filter(log => log.severity === severity)
      : categorizedLogs;

    const filteredCount = severity ? filteredLogs.length : (count || 0);
    const totalPages = Math.ceil(filteredCount / limit);

    res.status(200).json({
      success: true,
      data: filteredLogs,
      pagination: {
        page,
        limit,
        total: filteredCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      summary: {
        critical: categorizedLogs.filter(l => l.severity === 'critical').length,
        high: categorizedLogs.filter(l => l.severity === 'high').length,
        medium: categorizedLogs.filter(l => l.severity === 'medium').length,
        low: categorizedLogs.filter(l => l.severity === 'low').length
      }
    });
  } catch (error) {
    console.error('Error in getErrorLogs:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching error logs'
    });
  }
};

/**
 * Get dashboard overview summary
 * Combines metrics, recent activity, and quick stats
 */
export const getDashboardOverview = async (req, res) => {
  try {
    // Get basic metrics
    const { count: totalUsers, error: usersError } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact', head: true });

    // Get recent audit logs (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentLogs, error: logsError } = await supabase
      .from('audit_logs')
      .select('action, created_at')
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get system settings status
    const { data: maintenanceMode, error: settingsError } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'maintenance_mode')
      .single();

    const { data: registrationOpen, error: regError } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'registration_open')
      .single();

    res.status(200).json({
      success: true,
      data: {
        summary: {
          total_users: totalUsers || 0,
          maintenance_mode: maintenanceMode?.value === 'true',
          registration_open: registrationOpen?.value === 'true'
        },
        recent_activity: recentLogs || [],
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in getDashboardOverview:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching dashboard overview'
    });
  }
};
