-- ============================================
-- AAU Student Council - Supabase Database Setup
-- ============================================
-- This script sets up the database schema for the
-- Addis Ababa University Student Council website
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. EXTEND AUTH.USERS WITH CUSTOM ROLES
-- ============================================

-- Create a custom enum for user roles
CREATE TYPE user_role AS ENUM ('General Student', 'Council Member', 'Administrator');

-- Create a table to store user roles (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'General Student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- ============================================
-- 2. PROFILES TABLE (Linked to auth.users)
-- ============================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    department VARCHAR(255),
    year_of_study INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for frequently queried fields
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_student_id ON public.profiles(student_id);
CREATE INDEX idx_profiles_department ON public.profiles(department);

-- ============================================
-- 3. AUDIT LOGS TABLE (FR-ADM-07)
-- ============================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for audit log queries
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_entity_type ON public.audit_logs(entity_type);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ============================================
-- 4. SYSTEM SETTINGS TABLE (FR-ADM-08)
-- ============================================

CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT NOT NULL,
    description TEXT,
    data_type VARCHAR(20) DEFAULT 'string', -- string, boolean, integer, json
    is_public BOOLEAN DEFAULT FALSE, -- Whether non-auth users can read this
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on key for faster lookups
CREATE INDEX idx_system_settings_key ON public.system_settings(key);

-- Insert default system settings
INSERT INTO public.system_settings (key, value, description, data_type, is_public) VALUES
('maintenance_mode', 'false', 'Site-wide maintenance mode', 'boolean', true),
('registration_open', 'true', 'Allow new student registrations', 'boolean', true),
('site_name', 'AAU Student Council', 'Name of the website', 'string', true),
('contact_email', 'council@aau.edu.et', 'Contact email for the council', 'string', true),
('max_students_per_department', '100', 'Maximum students per department for council representation', 'integer', false)
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all custom tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR user_roles TABLE
-- ============================================

-- Function to check if user is administrator
CREATE OR REPLACE FUNCTION is_administrator()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'Administrator'
    );
$$;

-- Function to check if user is council member or administrator
CREATE OR REPLACE FUNCTION is_council_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role IN ('Council Member', 'Administrator')
    );
$$;

-- Policy: Users can read their own role
CREATE POLICY "Users can read own role"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Administrators can read all roles
CREATE POLICY "Administrators can read all roles"
ON public.user_roles
FOR SELECT
USING (is_administrator());

-- Policy: Only administrators can insert roles
CREATE POLICY "Only administrators can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (is_administrator());

-- Policy: Only administrators can update roles
CREATE POLICY "Only administrators can update roles"
ON public.user_roles
FOR UPDATE
USING (is_administrator());

-- Policy: Only administrators can delete roles
CREATE POLICY "Only administrators can delete roles"
ON public.user_roles
FOR DELETE
USING (is_administrator());

-- ============================================
-- RLS POLICIES FOR profiles TABLE
-- ============================================

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Council members and administrators can read all profiles
CREATE POLICY "Council and admin can read all profiles"
ON public.profiles
FOR SELECT
USING (is_council_or_admin());

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Administrators can update any profile
CREATE POLICY "Administrators can update any profile"
ON public.profiles
FOR UPDATE
USING (is_administrator());

-- Policy: Only administrators can delete profiles
CREATE POLICY "Only administrators can delete profiles"
ON public.profiles
FOR DELETE
USING (is_administrator());

-- ============================================
-- RLS POLICIES FOR audit_logs TABLE
-- ============================================

-- Policy: Only administrators can read audit logs
CREATE POLICY "Only administrators can read audit logs"
ON public.audit_logs
FOR SELECT
USING (is_administrator());

-- Policy: Only administrators can insert audit logs
CREATE POLICY "Only administrators can insert audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (is_administrator());

-- Policy: No one can update audit logs (immutable)
CREATE POLICY "No updates on audit logs"
ON public.audit_logs
FOR UPDATE
USING (false);

-- Policy: No one can delete audit logs (immutable)
CREATE POLICY "No deletes on audit logs"
ON public.audit_logs
FOR DELETE
USING (false);

-- ============================================
-- RLS POLICIES FOR system_settings TABLE
-- ============================================

-- Policy: Everyone can read public settings
CREATE POLICY "Everyone can read public settings"
ON public.system_settings
FOR SELECT
USING (is_public = true OR auth.uid() IS NOT NULL);

-- Policy: Only administrators can read all settings
CREATE POLICY "Administrators can read all settings"
ON public.system_settings
FOR SELECT
USING (is_administrator());

-- Policy: Only administrators can insert settings
CREATE POLICY "Only administrators can insert settings"
ON public.system_settings
FOR INSERT
WITH CHECK (is_administrator());

-- Policy: Only administrators can update settings
CREATE POLICY "Only administrators can update settings"
ON public.system_settings
FOR UPDATE
USING (is_administrator());

-- Policy: Only administrators can delete settings
CREATE POLICY "Only administrators can delete settings"
ON public.system_settings
FOR DELETE
USING (is_administrator());

-- ============================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at
    BEFORE UPDATE ON public.system_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HELPER FUNCTIONS FOR AUDIT LOGGING
-- ============================================

-- Function to log administrative actions
CREATE OR REPLACE FUNCTION log_admin_action(
    p_action VARCHAR(100),
    p_entity_type VARCHAR(50),
    p_entity_id UUID DEFAULT NULL,
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO public.audit_logs (
        user_id,
        action,
        entity_type,
        entity_id,
        old_values,
        new_values,
        ip_address,
        user_agent
    ) VALUES (
        auth.uid(),
        p_action,
        p_entity_type,
        p_entity_id,
        p_old_values,
        p_new_values,
        inet_client_addr(),
        current_setting('request.headers.user-agent', true)
    ) RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$;

-- ============================================
-- SETUP COMPLETE
-- ============================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION is_administrator() TO authenticated;
GRANT EXECUTE ON FUNCTION is_council_or_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION log_admin_action(VARCHAR, VARCHAR, UUID, JSONB, JSONB) TO authenticated;
