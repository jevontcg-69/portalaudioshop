import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const search = searchParams.get('search');

        let query = supabase
            .from('products')
            .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
            .order('created_at', { ascending: false });

        // Apply filters
        if (category) {
            query = query.eq('category_id', category);
        }

        if (featured === 'true') {
            query = query.eq('featured', true);
        }

        if (search) {
            query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { data, error } = await supabaseAdmin
            .from('products')
            .insert([body])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
