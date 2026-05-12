import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://audnsiugbynaogfpyadj.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1ZG5zaXVnYnluYW9nZnB5YWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjk4NjgsImV4cCI6MjA5MzgwNTg2OH0.XB8jQJ802_gVS3CSHVJ-wqXPmEDMpJmTPbglx5nwAgo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)