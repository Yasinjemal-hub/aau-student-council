import { supabase, supabaseAdmin } from '../config/supabase.js';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

/**
 * Helper function to parse CSV from buffer
 */
const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = require('stream');
    const readable = new stream.Readable();
    
    readable.push(buffer);
    readable.push(null);
    
    readable
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

/**
 * FR-ADM-04: Bulk import users from CSV file
 * CSV format should contain: email, student_id, full_name, department, year_of_study
 */
export const bulkImportUsers = async (req, res) => {
  try {
    // Use multer middleware to handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({
          error: 'Bad Request',
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'No file uploaded. Please provide a CSV file.'
        });
      }

      try {
        // Parse CSV file
        const csvData = await parseCSV(req.file.buffer);

        if (csvData.length === 0) {
          return res.status(400).json({
            error: 'Bad Request',
            message: 'CSV file is empty or invalid'
          });
        }

        // Validate CSV structure
        const requiredFields = ['email', 'student_id'];
        const firstRow = csvData[0];
        const missingFields = requiredFields.filter(field => !firstRow.hasOwnProperty(field));

        if (missingFields.length > 0) {
          return res.status(400).json({
            error: 'Bad Request',
            message: `CSV file is missing required fields: ${missingFields.join(', ')}`
          });
        }

        if (!supabaseAdmin) {
          return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Service role key not configured'
          });
        }

        // Process bulk import
        const results = {
          successful: [],
          failed: [],
          total: csvData.length
        };

        for (const row of csvData) {
          try {
            const { email, student_id, full_name, department, year_of_study } = row;

            // Validate required fields
            if (!email || !student_id) {
              results.failed.push({
                row,
                error: 'Missing required fields (email or student_id)'
              });
              continue;
            }

            // Check if user already exists
            const { data: existingUser, error: checkError } = await supabase
              .from('profiles')
              .select('user_id')
              .eq('student_id', student_id)
              .single();

            if (existingUser) {
              results.failed.push({
                row,
                error: 'User with this student ID already exists'
              });
              continue;
            }

            // Check if email already exists in auth
            const { data: existingEmail, error: emailCheckError } = await supabaseAdmin.auth.admin.listUsers();
            const emailExists = existingEmail.users.some(u => u.email === email);

            if (emailExists) {
              results.failed.push({
                row,
                error: 'User with this email already exists'
              });
              continue;
            }

            // Create user in Supabase Auth
            const { data: authUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
              email: email,
              password: generateRandomPassword(), // Generate a temporary password
              email_confirm: true,
              user_metadata: {
                full_name: full_name || '',
                student_id: student_id
              }
            });

            if (createError) {
              results.failed.push({
                row,
                error: createError.message
              });
              continue;
            }

            // Create user role (default to General Student)
            const { error: roleError } = await supabase
              .from('user_roles')
              .insert({
                user_id: authUser.user.id,
                role: 'General Student'
              });

            if (roleError) {
              // Rollback user creation if role assignment fails
              await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
              results.failed.push({
                row,
                error: 'Failed to assign user role'
              });
              continue;
            }

            // Create user profile
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                user_id: authUser.user.id,
                student_id: student_id,
                full_name: full_name || '',
                email: email,
                department: department || null,
                year_of_study: year_of_study ? parseInt(year_of_study) : null
              });

            if (profileError) {
              // Rollback user and role creation if profile creation fails
              await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
              await supabase.from('user_roles').delete().eq('user_id', authUser.user.id);
              results.failed.push({
                row,
                error: 'Failed to create user profile'
              });
              continue;
            }

            results.successful.push({
              user_id: authUser.user.id,
              email: email,
              student_id: student_id,
              full_name: full_name || ''
            });

          } catch (error) {
            console.error('Error processing row:', error);
            results.failed.push({
              row,
              error: error.message
            });
          }
        }

        // Log the bulk import action to audit_logs (FR-ADM-07)
        await supabase.from('audit_logs').insert({
          user_id: req.user.id,
          action: 'BULK_IMPORT_USERS',
          entity_type: 'bulk_import',
          entity_id: null,
          old_values: null,
          new_values: {
            total_records: results.total,
            successful: results.successful.length,
            failed: results.failed.length,
            timestamp: new Date().toISOString()
          },
          ip_address: req.ip,
          user_agent: req.get('user-agent')
        });

        res.status(200).json({
          success: true,
          message: 'Bulk import completed',
          data: results
        });

      } catch (error) {
        console.error('Error processing CSV:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'An error occurred while processing the CSV file'
        });
      }
    });

  } catch (error) {
    console.error('Error in bulkImportUsers:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during bulk import'
    });
  }
};

/**
 * Helper function to generate a random temporary password
 */
const generateRandomPassword = () => {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

/**
 * Get bulk import history from audit logs
 */
export const getBulkImportHistory = async (req, res) => {
  try {
    const { data: auditLogs, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('action', 'BULK_IMPORT_USERS')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching bulk import history:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch bulk import history'
      });
    }

    res.status(200).json({
      success: true,
      data: auditLogs,
      count: auditLogs.length
    });
  } catch (error) {
    console.error('Error in getBulkImportHistory:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching bulk import history'
    });
  }
};
