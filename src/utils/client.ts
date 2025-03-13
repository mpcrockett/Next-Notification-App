import { createClient } from '@supabase/supabase-js';

const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if(!anonKey || !supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_URL');
}

const supabase = createClient(supabaseUrl, anonKey);

export default supabase;