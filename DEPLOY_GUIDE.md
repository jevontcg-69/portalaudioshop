# Vercel Deployment Guide

Follow these steps to deploy your Portal Audio Indonesia website to Vercel.

## 1. Push to GitHub
If you haven't already, create a new repository on GitHub and push your local code:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

## 2. Deploy on Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, you MUST add the following keys from your `.env.local` file:

| Variable | Source / Tip |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase Dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase Dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase Dashboard |
| `NEXTAUTH_URL` | Set to your live URL (e.g., `https://your-site.vercel.app`) |
| `NEXTAUTH_SECRET` | Generate a random string |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | From Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary Dashboard |
| `ADMIN_EMAIL` | Your admin email |
| `ADMIN_PASSWORD` | Your admin password |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | e.g. `6281234567890` |
| `NEXT_PUBLIC_FORMSPREE_KEY` | Your Formspree Form ID |

## 3. Database Reminders
- Ensure your Supabase database schema is applied using the [supabase-schema.sql](file:///c:/Users/jevon/OneDrive/Desktop/portalaudio/supabase-schema.sql) file.
- If you haven't created an admin user yet, run the script: `node scripts/create-admin.js` (locally before deployment or via Supabase SQL editor).

## 4. Post-Deployment
- Once deployed, test your contact form to ensure Formspree notifications are working.
- Verify image uploads in the CMS to ensure Cloudinary is properly connected.
