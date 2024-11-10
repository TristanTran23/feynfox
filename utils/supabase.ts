import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://kjufzmihuxlneusawast.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqdWZ6bWlodXhsbmV1c2F3YXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNjkyNTIsImV4cCI6MjA0Njc0NTI1Mn0.gDPPDrJS2_QXlx8kVBQda6PP1p2B2qYaPVkP6I0DEc8",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }
)