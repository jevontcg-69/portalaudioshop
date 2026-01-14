import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
    // Check authorization
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            console.log('Starting Cloudinary upload...');
            cloudinary.uploader.upload_stream(
                {
                    folder: 'portal-audio/products',
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary callback error:', error);
                        reject(error);
                    } else {
                        console.log('Cloudinary upload success:', result?.secure_url);
                        resolve(result);
                    }
                }
            ).end(buffer);
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Upload catch error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error', details: error },
            { status: 500 }
        );
    }
}
