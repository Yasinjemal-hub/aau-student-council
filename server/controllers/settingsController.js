import { supabase } from '../config/supabase.js';

/**
 * FR-ADM-08: Get all system settings
 */
export const getAllSettings = async (req, res) => {
  try {
    const { data: settings, error } = await supabase
      .from('system_settings')
      .select('*')
      .order('key');

    if (error) {
      console.error('Error fetching system settings:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch system settings'
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
      count: settings.length
    });
  } catch (error) {
    console.error('Error in getAllSettings:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching system settings'
    });
  }
};

/**
 * FR-ADM-08: Get a single system setting by key
 */
export const getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;

    const { data: setting, error } = await supabase
      .from('system_settings')
      .select('*')
      .eq('key', key)
      .single();

    if (error || !setting) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Setting not found'
      });
    }

    res.status(200).json({
      success: true,
      data: setting
    });
  } catch (error) {
    console.error('Error in getSettingByKey:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching setting'
    });
  }
};

/**
 * FR-ADM-08: Update a system setting (PUT)
 * Logs action to audit_logs
 */
export const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description, data_type, is_public } = req.body;

    // Get current setting for audit log
    const { data: currentSetting, error: fetchError } = await supabase
      .from('system_settings')
      .select('*')
      .eq('key', key)
      .single();

    if (fetchError || !currentSetting) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Setting not found'
      });
    }

    const oldValues = { ...currentSetting };

    // Update setting
    const { data: updatedSetting, error: updateError } = await supabase
      .from('system_settings')
      .update({
        value: value !== undefined ? value : currentSetting.value,
        description: description !== undefined ? description : currentSetting.description,
        data_type: data_type !== undefined ? data_type : currentSetting.data_type,
        is_public: is_public !== undefined ? is_public : currentSetting.is_public,
        updated_at: new Date().toISOString()
      })
      .eq('key', key)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating system setting:', updateError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update system setting'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'UPDATE_SETTING',
      entity_type: 'system_setting',
      entity_id: updatedSetting.id,
      old_values: oldValues,
      new_values: updatedSetting,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'System setting updated successfully',
      data: updatedSetting
    });
  } catch (error) {
    console.error('Error in updateSetting:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while updating system setting'
    });
  }
};

/**
 * FR-ADM-08: Create a new system setting
 * Logs action to audit_logs
 */
export const createSetting = async (req, res) => {
  try {
    const { key, value, description, data_type, is_public } = req.body;

    if (!key || !value) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Key and value are required'
      });
    }

    // Create setting
    const { data: newSetting, error: insertError } = await supabase
      .from('system_settings')
      .insert({
        key,
        value,
        description: description || '',
        data_type: data_type || 'string',
        is_public: is_public !== undefined ? is_public : false
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating system setting:', insertError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to create system setting'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'CREATE_SETTING',
      entity_type: 'system_setting',
      entity_id: newSetting.id,
      old_values: null,
      new_values: newSetting,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(201).json({
      success: true,
      message: 'System setting created successfully',
      data: newSetting
    });
  } catch (error) {
    console.error('Error in createSetting:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while creating system setting'
    });
  }
};

/**
 * FR-ADM-08: Delete a system setting
 * Logs action to audit_logs
 */
export const deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;

    // Get current setting for audit log
    const { data: currentSetting, error: fetchError } = await supabase
      .from('system_settings')
      .select('*')
      .eq('key', key)
      .single();

    if (fetchError || !currentSetting) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Setting not found'
      });
    }

    const oldValues = { ...currentSetting };

    // Delete setting
    const { error: deleteError } = await supabase
      .from('system_settings')
      .delete()
      .eq('key', key);

    if (deleteError) {
      console.error('Error deleting system setting:', deleteError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete system setting'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'DELETE_SETTING',
      entity_type: 'system_setting',
      entity_id: currentSetting.id,
      old_values: oldValues,
      new_values: null,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'System setting deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteSetting:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while deleting system setting'
    });
  }
};

/**
 * FR-ADM-08: Toggle maintenance mode
 * Logs action to audit_logs
 */
export const toggleMaintenanceMode = async (req, res) => {
  try {
    const { enabled } = req.body;

    if (typeof enabled !== 'boolean') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Enabled must be a boolean value'
      });
    }

    // Get current setting for audit log
    const { data: currentSetting, error: fetchError } = await supabase
      .from('system_settings')
      .select('*')
      .eq('key', 'maintenance_mode')
      .single();

    const oldValues = currentSetting ? { ...currentSetting } : null;

    // Update or create maintenance mode setting
    const { data: updatedSetting, error: updateError } = await supabase
      .from('system_settings')
      .upsert({
        key: 'maintenance_mode',
        value: enabled.toString(),
        description: 'Site-wide maintenance mode',
        data_type: 'boolean',
        is_public: true,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (updateError) {
      console.error('Error toggling maintenance mode:', updateError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to toggle maintenance mode'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'TOGGLE_MAINTENANCE_MODE',
      entity_type: 'system_setting',
      entity_id: updatedSetting.id,
      old_values: oldValues,
      new_values: updatedSetting,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: `Maintenance mode ${enabled ? 'enabled' : 'disabled'} successfully`,
      data: updatedSetting
    });
  } catch (error) {
    console.error('Error in toggleMaintenanceMode:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while toggling maintenance mode'
    });
  }
};
