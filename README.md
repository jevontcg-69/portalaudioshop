# Portal Audio Indonesia - E-Commerce Website

Indonesian audio accessories e-commerce platform specializing in USA-imported products with integrated CMS for content management.

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **File Storage**: Cloudinary
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 20+ and npm
- Supabase account (free tier available)
- Cloudinary account (free tier available)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script to create all tables, indexes, and policies

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for admin operations)

3. Generate a NextAuth secret:
```bash
openssl rand -base64 32
```
   - Add this to `NEXTAUTH_SECRET` in `.env.local`

4. Set up Cloudinary:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your API key
   - `CLOUDINARY_API_SECRET`: Your API secret

5. Configure WhatsApp number:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your WhatsApp business number (format: 6281234567890)

### 4. Create Admin User

Run this SQL in your Supabase SQL Editor to create an admin user:

```sql
-- Replace with your desired email and password
-- Password: 'admin123' (hashed with bcrypt)
INSERT INTO users (email, password_hash, name, role) VALUES
  ('admin@portalaudio.id', '$2a$10$YourBcryptHashHere', 'Admin', 'admin');
```

To generate a bcrypt hash for your password, you can use:
```bash
node -e "console.log(require('bcryptjs').hashSync('your_password', 10))"
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## 📁 Project Structure

```
portalaudio/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth authentication
│   │   ├── products/     # Product CRUD
│   │   ├── categories/   # Category management
│   │   ├── dealers/      # Dealer management
│   │   ├── inquiries/    # Contact inquiries
│   │   ├── testimonials/ # Testimonials
│   │   └── blog/         # Blog posts
│   ├── admin/            # Admin panel pages
│   ├── products/         # Public product pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── layout.tsx        # Root layout
├── components/           # React components
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── auth.ts           # Auth helpers
├── types/                # TypeScript types
└── public/               # Static assets
```

## 🔐 Admin Panel

Access the admin panel at `/admin` after logging in.

**Default Admin Features:**
- Dashboard with statistics
- Product Management (CRUD)
- Category Management
- Dealer Management
- Inquiry Management
- Testimonial Management
- Blog Post Management

## 🌐 API Routes

### Public Endpoints

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/[slug]` - Get single product
- `GET /api/categories` - Get all categories
- `GET /api/dealers` - Get active dealers
- `GET /api/testimonials` - Get testimonials
- `GET /api/blog` - Get published blog posts
- `POST /api/inquiries` - Submit contact inquiry

### Admin Endpoints (Require Authentication)

- `POST /api/products` - Create product
- `PUT /api/products/[slug]` - Update product
- `DELETE /api/products/[slug]` - Delete product
- `POST /api/categories` - Create category
- `POST /api/dealers` - Create dealer
- `POST /api/testimonials` - Create testimonial
- `POST /api/blog` - Create blog post

## 🎨 Customization

### Colors

Edit `app/globals.css` to customize the Indonesian-inspired color palette:
- Primary: Deep Ocean Blue (#0F4C81)
- Secondary: Vibrant Orange (#FF6B35)
- Accent: Deep Red (#C62828)
- Gold: Premium Gold (#D4AF37)

### Content

1. **Products**: Add via admin panel or directly in Supabase
2. **Categories**: Pre-populated with default categories
3. **Company Info**: Update in `components/Footer.tsx`
4. **WhatsApp Number**: Set in `.env.local`

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Deploy!

### Post-Deployment

1. Update `NEXTAUTH_URL` in production environment variables
2. Configure custom domain in Vercel settings
3. Set up Supabase production database
4. Update CORS settings in Supabase if needed

## 📝 Database Schema

The database includes the following tables:
- `categories` - Product categories
- `products` - Product catalog
- `dealers` - Authorized dealers
- `testimonials` - Customer testimonials
- `inquiries` - Contact form submissions
- `blog_posts` - Blog/news articles
- `users` - Admin users

See `supabase-schema.sql` for complete schema details.

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Admin routes protected with NextAuth
- Password hashing with bcrypt
- Environment variables for sensitive data
- CORS configured for API routes

## 📧 Support

For issues or questions, contact: info@portalaudio.id

## 📄 License

Proprietary - Portal Audio Indonesia

---

Built with ❤️ for Indonesian audio enthusiasts
