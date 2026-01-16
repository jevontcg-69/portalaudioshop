import { supabase } from "@/lib/supabase";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const { data: blogPosts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

    return (
        <main className="flex min-h-screen flex-col bg-black pt-20">
            {/* Header */}
            <section className="w-full border-b border-white/5 bg-black py-16 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                        The Archive
                    </p>
                    <h1 className="text-5xl font-light tracking-tight text-white md:text-6xl">
                        Technical Journal
                    </h1>
                    <p className="mt-4 text-zinc-400 max-w-2xl">
                        Insights, updates, and deep dives into the world of high-fidelity car audio.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="w-full bg-black py-24 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts && blogPosts.length > 0 ? (
                            blogPosts.map((post) => (
                                <BlogCard key={post.id} post={post as any} />
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center border border-dashed border-white/10">
                                <p className="text-zinc-500">The journal is currently empty. Stay tuned for updates.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
