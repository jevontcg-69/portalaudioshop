// Script to create an admin user
// Run this with: node scripts/create-admin.js

const bcrypt = require('bcryptjs');

async function createAdminHash() {
    const password = process.argv[2] || 'admin123';

    console.log('\n🔐 Creating Admin User Hash\n');
    console.log('Password:', password);

    const hash = await bcrypt.hash(password, 10);

    console.log('\nBcrypt Hash:', hash);
    console.log('\n📋 SQL to run in Supabase:\n');
    console.log(`INSERT INTO users (email, password_hash, name, role) VALUES`);
    console.log(`  ('admin@portalaudio.id', '${hash}', 'Admin', 'admin');`);
    console.log('\n✅ Copy the SQL above and run it in your Supabase SQL Editor\n');
}

createAdminHash().catch(console.error);
