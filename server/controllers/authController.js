import { supabase, supabaseAdmin } from '../config/supabase.js';

/**
 * Register a new user
 * POST /auth/register
 */
export const register = async (req, res) => {
  try {
    const { studentId, email, password } = req.body;

    // Validate required fields
    if (!studentId || !email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Student ID, email, and password are required'
      });
    }

    // Check if user already exists in profiles table
    const { data: existingProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single();

    if (existingProfile) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User with this email already exists'
      });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for development
      user_metadata: {
        student_id: studentId
      }
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      return res.status(400).json({
        error: 'Registration Failed',
        message: authError.message || 'Failed to create user account'
      });
    }

    // Create user profile in profiles table
    const { error: profileInsertError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email,
        student_id: studentId,
        full_name: email.split('@')[0], // Default name from email
        created_at: new Date().toISOString()
      });

    if (profileInsertError) {
      console.error('Profile creation error:', profileInsertError);
      // Rollback: delete the auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({
        error: 'Registration Failed',
        message: 'Failed to create user profile'
      });
    }

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        studentId: studentId
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during registration'
    });
  }
};

/**
 * Login user
 * POST /auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email and password are required'
      });
    }

    // Sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid email or password'
      });
    }

    // Get user role from user_roles table
    const { data: userRole, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', authData.user.id)
      .single();

    // If no role found, assign default 'Student' role
    let role = 'Student';
    if (roleError || !userRole) {
      // Create default role for new users
      const { error: insertRoleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'Student'
        });

      if (insertRoleError) {
        console.error('Role assignment error:', insertRoleError);
      }
    } else {
      role = userRole.role;
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // Return token and user info
    res.status(200).json({
      message: 'Login successful',
      token: authData.session.access_token,
      role: role,
      user: profile || {
        id: authData.user.id,
        email: authData.user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during login'
    });
  }
};

/**
 * Get current user info
 * GET /auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (profileError) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User profile not found'
      });
    }

    // Get user role
    const { data: userRole, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', req.user.id)
      .single();

    res.status(200).json({
      user: profile,
      role: userRole?.role || 'Student'
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching user info'
    });
  }
};

/**
 * Logout user
 * POST /auth/logout
 */
export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      return res.status(500).json({
        error: 'Logout Failed',
        message: 'Failed to logout'
      });
    }

    res.status(200).json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during logout'
    });
  }
};
