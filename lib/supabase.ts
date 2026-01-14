import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key (for admin operations)
export const supabaseAdmin = createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

// Database types
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    category_id?: string;
    description?: string;
    specifications?: Record<string, any>;
    price?: number;
    brand?: string;
    origin?: string;
    availability?: string;
    images?: string[];
    featured?: boolean;
    created_at: string;
    updated_at: string;
}

export interface Dealer {
    id: string;
    name: string;
    address: string;
    city: string;
    region: string;
    phone?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
    status?: string;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: string;
    customer_name: string;
    company?: string;
    content: string;
    rating?: number;
    product_id?: string;
    featured?: boolean;
    created_at: string;
    updated_at: string;
}

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    product_id?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    author?: string;
    published?: boolean;
    published_at?: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    email: string;
    password_hash: string;
    name?: string;
    role?: string;
    created_at: string;
    updated_at: string;
}
