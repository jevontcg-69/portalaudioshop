import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/testimonials - Get all testimonials
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const featured = searchParams.get('featured');

        let query = supabase
            .from('testimonials')
            .select(`
        *,
        products (
          id,
          name,
          slug
        )
      `)
            .order('created_at', { ascending: false });

        if (featured === 'true') {
            query = query.eq('featured', true);
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

// POST /api/testimonials - Create a new testimonial (admin only)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from('testimonials')
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
