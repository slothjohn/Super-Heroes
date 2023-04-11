import { createClient } from '@supabase/supabase-js'
const URL = 'https://klxhuedjdkvsnnhwrmzj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseGh1ZWRqZGt2c25uaHdybXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNTM5ODQsImV4cCI6MTk5NjcyOTk4NH0.AggLgwBQvWPMXQ_6r0lKrSIlI3j_0CIK4GAdfEGpfJw';

export const supabase = createClient(URL, API_KEY);