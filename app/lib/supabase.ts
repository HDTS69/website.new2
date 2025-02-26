import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Use environment variable
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use environment variable
);

export default supabase;