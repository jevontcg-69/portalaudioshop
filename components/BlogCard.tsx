"use client";

import Link from "next/link";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    featured_image: string | null;
    instagram_url: string | null;
    published_at: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <div className="group flex flex-col">
            <Link
                href={`/blog/${post.slug}`}
                className="aspect-video w-full overflow-hidden bg-surface relative mb-6 border border-white/5"
            >
                {post.featured_image ? (
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : post.instagram_url ? (
                    <img
                        src={`https://images.weserv.nl/?url=${encodeURIComponent(post.instagram_url.replace(/\/$/, '') + '/media/?size=l')}&w=600&fit=cover`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            // Last ditch effort: hide and show placeholder
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                                parent.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-zinc-800 text-xs tracking-widest uppercase">Journal</div>';
                            }
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-800 text-xs tracking-widest uppercase">Journal</div>
                )}

                {post.instagram_url && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 z-10">
                        <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.352.062-2.73.34-3.748 1.358-1.018 1.018-1.296 2.396-1.358 3.748-.058 1.28-.072 1.688-.072 4.947s.014 3.668.072 4.948c.062 1.352.34 2.73 1.358 3.748 1.018 1.018 2.396 1.296 3.748 1.358 1.28.058 1.688.072 4.947.072s3.668-.014 4.948-.072c1.352-.062 2.73-.34 3.748-1.358 1.018-1.018 1.296-2.396 1.358-3.748.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.062-1.352-.34-2.73-1.358-3.748-1.018-1.018-2.396-1.296-3.748-1.358-1.28-.058-1.688-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44-1.44-.645-1.44-1.44.645-1.44 1.44-1.44z" />
                        </svg>
                    </div>
                )}
            </Link>
            <Link href={`/blog/${post.slug}`}>
                <h4 className="text-xl font-light tracking-tight text-white group-hover:text-gold transition-colors duration-300 mb-3">{post.title}</h4>
            </Link>
            <p className="text-sm text-zinc-500 line-clamp-2 mb-4 leading-relaxed">{post.excerpt || "Reading between the lines of audio perfection."}</p>
            <Link href={`/blog/${post.slug}`} className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase border-b border-gold/30 pb-1 w-fit">
                Read Entry
            </Link>
        </div>
    );
}
