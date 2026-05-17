import { supabase, supabaseAdmin } from '../config/supabase.js';

/**
 * FR-ADM-01: Fetch all users with their roles and profiles
 */
export const getAllUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('user_roles')
      .select(`
        user_id,
        role,
        created_at,
        updated_at,
        profiles (
          student_id,
          full_name,
          email,
          phone,
          department,
          year_of_study
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch users'
      });
    }

    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching users'
    });
  }
};

/**
 * FR-ADM-01: Fetch a single user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: user, error } = await supabase
      .from('user_roles')
      .select(`
        user_id,
        role,
        created_at,
        updated_at,
        profiles (
          student_id,
          full_name,
          email,
          phone,
          department,
          year_of_study
        )
      `)
      .eq('user_id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching user'
    });
  }
};

/**
 * FR-ADM-01: Modify a user's profile
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { full_name, email, phone, department, year_of_study } = req.body;

    // Check if user exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError || !existingProfile) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User profile not found'
      });
    }

    // Store old values for audit log
    const oldValues = { ...existingProfile };

    // Update profile
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: full_name || existingProfile.full_name,
        email: email || existingProfile.email,
        phone: phone || existingProfile.phone,
        department: department || existingProfile.department,
        year_of_study: year_of_study || existingProfile.year_of_study,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user profile:', updateError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update user profile'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'UPDATE_PROFILE',
      entity_type: 'profile',
      entity_id: userId,
      old_values: oldValues,
      new_values: updatedProfile,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedProfile
    });
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while updating user profile'
    });
  }
};

/**
 * FR-ADM-01: Deactivate a user account
 */
export const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!supabaseAdmin) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Service role key not configured'
      });
    }

    // Get current user data for audit log
    const { data: currentUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (fetchError || !currentUser) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    const oldValues = { ...currentUser.user };

    // Deactivate user by banning them
    const { error: banError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      ban: true
    });

    if (banError) {
      console.error('Error deactivating user:', banError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to deactivate user'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'DEACTIVATE_USER',
      entity_type: 'user',
      entity_id: userId,
      old_values: oldValues,
      new_values: { ban: true },
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    console.error('Error in deactivateUser:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while deactivating user'
    });
  }
};

/**
 * FR-ADM-01: Reactivate a user account
 */
export const reactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!supabaseAdmin) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Service role key not configured'
      });
    }

    // Get current user data for audit log
    const { data: currentUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (fetchError || !currentUser) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    const oldValues = { ...currentUser.user };

    // Reactivate user by unbanning them
    const { error: unbanError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      ban: false
    });

    if (unbanError) {
      console.error('Error reactivating user:', unbanError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to reactivate user'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'REACTIVATE_USER',
      entity_type: 'user',
      entity_id: userId,
      old_values: oldValues,
      new_values: { ban: false },
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'User reactivated successfully'
    });
  } catch (error) {
    console.error('Error in reactivateUser:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while reactivating user'
    });
  }
};

/**
 * FR-ADM-01: Delete a user account
 */
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!supabaseAdmin) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Service role key not configured'
      });
    }

    // Get current user data for audit log
    const { data: currentUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (fetchError || !currentUser) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    const oldValues = { ...currentUser.user };

    // Delete user
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete user'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'DELETE_USER',
      entity_type: 'user',
      entity_id: userId,
      old_values: oldValues,
      new_values: null,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while deleting user'
    });
  }
};

/**
 * FR-ADM-02: Assign a role to a user
 */
export const assignRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate role
    const validRoles = ['General Student', 'Council Member', 'Administrator'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid role. Must be one of: General Student, Council Member, Administrator'
      });
    }

    // Check if user exists
    const { data: existingRole, error: checkError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .single();

    const oldValues = existingRole ? { ...existingRole } : null;

    if (existingRole) {
      // Update existing role
      const { data: updatedRole, error: updateError } = await supabase
        .from('user_roles')
        .update({ role, updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating user role:', updateError);
        return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to update user role'
        });
      }

      // Log the action to audit_logs
      await supabase.from('audit_logs').insert({
        user_id: req.user.id,
        action: 'UPDATE_ROLE',
        entity_type: 'user_role',
        entity_id: userId,
        old_values: oldValues,
        new_values: updatedRole,
        ip_address: req.ip,
        user_agent: req.get('user-agent')
      });

      res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data: updatedRole
      });
    } else {
      // Create new role assignment
      const { data: newRole, error: insertError } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role })
        .select()
        .single();

      if (insertError) {
        console.error('Error assigning user role:', insertError);
        return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to assign user role'
        });
      }

      // Log the action to audit_logs
      await supabase.from('audit_logs').insert({
        user_id: req.user.id,
        action: 'ASSIGN_ROLE',
        entity_type: 'user_role',
        entity_id: userId,
        old_values: null,
        new_values: newRole,
        ip_address: req.ip,
        user_agent: req.get('user-agent')
      });

      res.status(201).json({
        success: true,
        message: 'User role assigned successfully',
        data: newRole
      });
    }
  } catch (error) {
    console.error('Error in assignRole:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while assigning user role'
    });
  }
};

/**
 * FR-ADM-02: Revoke a role from a user (reset to General Student)
 */
export const revokeRole = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user has a role
    const { data: existingRole, error: checkError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError || !existingRole) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User role not found'
      });
    }

    const oldValues = { ...existingRole };

    // Reset role to General Student
    const { data: updatedRole, error: updateError } = await supabase
      .from('user_roles')
      .update({ role: 'General Student', updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error revoking user role:', updateError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to revoke user role'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'REVOKE_ROLE',
      entity_type: 'user_role',
      entity_id: userId,
      old_values: oldValues,
      new_values: updatedRole,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'User role revoked successfully',
      data: updatedRole
    });
  } catch (error) {
    console.error('Error in revokeRole:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while revoking user role'
    });
  }
};

/**
 * FR-ADM-05: Reset a user's password and force password change on next login
 */
export const resetUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { new_password } = req.body;

    if (!new_password || new_password.length < 6) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Password must be at least 6 characters long'
      });
    }

    if (!supabaseAdmin) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Service role key not configured'
      });
    }

    // Get current user data for audit log
    const { data: currentUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (fetchError || !currentUser) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    const oldValues = { ...currentUser.user };

    // Reset password
    const { error: resetError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: new_password,
      email_confirm: true // Force email confirmation
    });

    if (resetError) {
      console.error('Error resetting user password:', resetError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to reset user password'
      });
    }

    // Log the action to audit_logs (without logging the actual password)
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'RESET_PASSWORD',
      entity_type: 'user',
      entity_id: userId,
      old_values: oldValues,
      new_values: { password_reset: true, force_password_change: true },
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'User password reset successfully. User will be required to change password on next login.'
    });
  } catch (error) {
    console.error('Error in resetUserPassword:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while resetting user password'
    });
  }
};
