import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col bg-black pt-20">
            {/* Header / Hero Area */}
            <section className="w-full bg-[#050505] py-24 px-6 md:px-12 border-b border-white/5">
                <div className="mx-auto max-w-4xl text-center">
                    <Link href="/" className="text-[10px] font-semibold tracking-[0.4em] text-gold uppercase mb-8 inline-block hover:opacity-70 transition-opacity">
                        &larr; Back to Journal
                    </Link>
                    <h1 className="text-4xl font-light tracking-tight text-white md:text-6xl mb-6">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 uppercase tracking-widest">
                        <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        {post.author && (
                            <>
                                <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                <span>By {post.author}</span>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <section className="w-full bg-black py-24 px-6 md:px-12">
                <div className="mx-auto max-w-3xl">
                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="aspect-video w-full overflow-hidden bg-surface mb-16 border border-white/5">
                            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Instagram Full Embed */}
                    {post.instagram_url && (
                        <div className="mb-16 flex justify-center">
                            <blockquote
                                className="instagram-media"
                                data-instgrm-captioned
                                data-instgrm-permalink={post.instagram_url}
                                data-instgrm-version="14"
                                style={{
                                    background: "#000",
                                    border: "0",
                                    borderRadius: "3px",
                                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                                    margin: "1px",
                                    maxWidth: "540px",
                                    minWidth: "326px",
                                    padding: "0",
                                    width: "calc(100% - 2px)"
                                }}
                            >
                                <div style={{ padding: '16px' }}>
                                    <a href={post.instagram_url} target="_blank" rel="noopener noreferrer" style={{ color: '#D4AF37', textDecoration: 'none' }}>
                                        View this post on Instagram
                                    </a>
                                </div>
                            </blockquote>
                            <Script async src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
                        </div>
                    )}

                    {/* Blog Text Content */}
                    <div className="prose prose-invert prose-gold max-w-none">
                        <div className="text-zinc-300 font-light text-lg leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </div>

                    {/* Footer / Share */}
                    <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h4 className="text-white font-medium mb-2">Share this entry</h4>
                            <div className="flex gap-4">
                                <a href="#" className="text-zinc-500 hover:text-gold transition-colors text-xs uppercase tracking-widest">Twitter</a>
                                <a href="#" className="text-zinc-500 hover:text-gold transition-colors text-xs uppercase tracking-widest">LinkedIn</a>
                                <a href="#" className="text-zinc-500 hover:text-gold transition-colors text-xs uppercase tracking-widest">Email</a>
                            </div>
                        </div>
                        <Link href="/" className="border border-gold text-gold px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-gold hover:text-black transition-all">
                            More Journal Entries
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
