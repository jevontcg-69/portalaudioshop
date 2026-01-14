const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function addInstagramColumn() {
    console.log('Attempting to add instagram_url column to blog_posts...');

    // Using RPC if available or just trying to insert a dummy record with the column
    // In Supabase, we can use the 'query' method if we have a direct connection, 
    // but with the SDK we usually use the pre-defined table interfaces.

    // Another way is to use the Postgres REST API (PostgREST) which Supabase is built on.
    // However, the easiest way is to ask the user to run the SQL.

    console.log('Please run this SQL in your Supabase SQL Editor:');
    console.log('ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS instagram_url TEXT;');
}

addInstagramColumn();
