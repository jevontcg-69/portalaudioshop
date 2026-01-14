# SETUP INSTRUCTIONS

## ⚠️ Important: Environment Variables Required

The `.env.local` file currently contains **placeholder values** that will allow the app to run without crashing, but **you must replace them with real credentials** for full functionality.

### 1. Set Up Supabase (Required for Database)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project (free tier available)
3. Navigate to: **Settings** → **API**
4. Copy your credentials and update `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your service_role key
5. Go to **SQL Editor** in Supabase dashboard
6. Copy and paste the contents of `supabase-schema.sql`
7. Click **Run** to create all tables

### 2. Generate NextAuth Secret (Required for Login)

Run this command in your terminal:
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows PowerShell:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and update `NEXTAUTH_SECRET` in `.env.local`

### 3. Create Admin User (Required for Admin Panel)

After setting up Supabase, create an admin user:

```bash
# Generate password hash
node scripts/create-admin.js your_desired_password
```

Copy the SQL output and run it in your Supabase SQL Editor.

### 4. Restart Development Server

After updating `.env.local`:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🎯 Quick Test Checklist

- [ ] All pages load without 404 errors
- [ ] Contact form submits successfully
- [ ] Admin login works with your credentials
- [ ] API endpoints return data (not "supabaseUrl is required" error)

## 📝 Current State

✅ **Pages Created:**
- Home page (already existed)
- Products page
- About page
- Dealers page
- Contact page (with working form)
- Admin login page
- Admin dashboard (placeholder)

✅ **Fixes Applied:**
- Fixed 404 errors on all navigation links
- Fixed hydration mismatch in layout
- Added placeholder env vars to prevent crashes
- All pages match Harrison Laboratory UI theme

⚠️ **Still Needs:**
- Real Supabase credentials
- NextAuth secret generation
- Admin user creation

## 🚀 Ready to Deploy?

Once you have:
1. Real Supabase credentials configured
2. NextAuth secret generated
3. Admin user created
4. Tested locally

You can deploy to Vercel following the instructions in `README.md`
