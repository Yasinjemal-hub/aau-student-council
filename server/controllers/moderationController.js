import { supabase } from '../config/supabase.js';

/**
 * FR-ADM-09: Get all content categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from('content_categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch categories'
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    console.error('Error in getAllCategories:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching categories'
    });
  }
};

/**
 * FR-ADM-09: Create a new content category
 * Logs action to audit_logs
 */
export const createCategory = async (req, res) => {
  try {
    const { name, description, content_type } = req.body;

    if (!name || !content_type) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Name and content_type are required'
      });
    }

    // Validate content_type
    const validContentTypes = ['announcement', 'feedback'];
    if (!validContentTypes.includes(content_type)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'content_type must be either "announcement" or "feedback"'
      });
    }

    // Create category
    const { data: newCategory, error: insertError } = await supabase
      .from('content_categories')
      .insert({
        name,
        description: description || '',
        content_type
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating category:', insertError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to create category'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'CREATE_CATEGORY',
      entity_type: 'content_category',
      entity_id: newCategory.id,
      old_values: null,
      new_values: newCategory,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory
    });
  } catch (error) {
    console.error('Error in createCategory:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while creating category'
    });
  }
};

/**
 * FR-ADM-09: Update a content category
 * Logs action to audit_logs
 */
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, content_type } = req.body;

    // Get current category for audit log
    const { data: currentCategory, error: fetchError } = await supabase
      .from('content_categories')
      .select('*')
      .eq('id', categoryId)
      .single();

    if (fetchError || !currentCategory) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Category not found'
      });
    }

    const oldValues = { ...currentCategory };

    // Validate content_type if provided
    if (content_type) {
      const validContentTypes = ['announcement', 'feedback'];
      if (!validContentTypes.includes(content_type)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'content_type must be either "announcement" or "feedback"'
        });
      }
    }

    // Update category
    const { data: updatedCategory, error: updateError } = await supabase
      .from('content_categories')
      .update({
        name: name || currentCategory.name,
        description: description !== undefined ? description : currentCategory.description,
        content_type: content_type || currentCategory.content_type,
        updated_at: new Date().toISOString()
      })
      .eq('id', categoryId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating category:', updateError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update category'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'UPDATE_CATEGORY',
      entity_type: 'content_category',
      entity_id: updatedCategory.id,
      old_values: oldValues,
      new_values: updatedCategory,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    console.error('Error in updateCategory:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while updating category'
    });
  }
};

/**
 * FR-ADM-09: Delete a content category
 * Logs action to audit_logs
 */
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Get current category for audit log
    const { data: currentCategory, error: fetchError } = await supabase
      .from('content_categories')
      .select('*')
      .eq('id', categoryId)
      .single();

    if (fetchError || !currentCategory) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Category not found'
      });
    }

    const oldValues = { ...currentCategory };

    // Delete category
    const { error: deleteError } = await supabase
      .from('content_categories')
      .delete()
      .eq('id', categoryId);

    if (deleteError) {
      console.error('Error deleting category:', deleteError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete category'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'DELETE_CATEGORY',
      entity_type: 'content_category',
      entity_id: currentCategory.id,
      old_values: oldValues,
      new_values: null,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while deleting category'
    });
  }
};

/**
 * FR-ADM-10: Get flagged content (announcements or feedback)
 */
export const getFlaggedContent = async (req, res) => {
  try {
    const { content_type } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('flagged_content')
      .select(`
        *,
        profiles (
          full_name,
          email,
          student_id
        )
      `, { count: 'exact' });

    if (content_type) {
      query = query.eq('content_type', content_type);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: flaggedContent, error, count } = await query;

    if (error) {
      console.error('Error fetching flagged content:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch flagged content'
      });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    res.status(200).json({
      success: true,
      data: flaggedContent,
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
    console.error('Error in getFlaggedContent:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching flagged content'
    });
  }
};

/**
 * FR-ADM-10: Delete flagged content
 * Logs action to audit_logs
 */
export const deleteFlaggedContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Get current flagged content for audit log
    const { data: currentContent, error: fetchError } = await supabase
      .from('flagged_content')
      .select('*')
      .eq('id', contentId)
      .single();

    if (fetchError || !currentContent) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Flagged content not found'
      });
    }

    const oldValues = { ...currentContent };

    // Delete flagged content
    const { error: deleteError } = await supabase
      .from('flagged_content')
      .delete()
      .eq('id', contentId);

    if (deleteError) {
      console.error('Error deleting flagged content:', deleteError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete flagged content'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'DELETE_FLAGGED_CONTENT',
      entity_type: 'flagged_content',
      entity_id: contentId,
      old_values: oldValues,
      new_values: null,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'Flagged content deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteFlaggedContent:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while deleting flagged content'
    });
  }
};

/**
 * FR-ADM-10: Approve flagged content (remove flag)
 * Logs action to audit_logs
 */
export const approveFlaggedContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Get current flagged content for audit log
    const { data: currentContent, error: fetchError } = await supabase
      .from('flagged_content')
      .select('*')
      .eq('id', contentId)
      .single();

    if (fetchError || !currentContent) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Flagged content not found'
      });
    }

    const oldValues = { ...currentContent };

    // Remove flag (delete from flagged_content table)
    const { error: deleteError } = await supabase
      .from('flagged_content')
      .delete()
      .eq('id', contentId);

    if (deleteError) {
      console.error('Error approving flagged content:', deleteError);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to approve flagged content'
      });
    }

    // Log the action to audit_logs
    await supabase.from('audit_logs').insert({
      user_id: req.user.id,
      action: 'APPROVE_FLAGGED_CONTENT',
      entity_type: 'flagged_content',
      entity_id: contentId,
      old_values: oldValues,
      new_values: { status: 'approved' },
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.status(200).json({
      success: true,
      message: 'Flagged content approved successfully'
    });
  } catch (error) {
    console.error('Error in approveFlaggedContent:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while approving flagged content'
    });
  }
};
