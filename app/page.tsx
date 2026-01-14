import { Hero } from "@/components/ui/Hero";
import Link from "next/link";
import Script from "next/script";
import { supabase } from "@/lib/supabase";
import BlogCard from "@/components/BlogCard";

export default async function Home() {
  // Fetch featured products
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('featured', true)
    .limit(3);

  // Fetch featured testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .limit(3);

  // Fetch latest blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(3);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Hero />

      {/* Featured Products / Collections Section */}
      <section className="w-full bg-black py-24 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between border-b border-white/5 pb-8">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-2">Curated Selection</h2>
              <h3 className="text-3xl font-light tracking-tight text-white">The Collection</h3>
            </div>
            <Link href="/products" className="text-xs font-medium tracking-widest text-zinc-400 uppercase hover:text-gold transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id} className="group cursor-pointer">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-surface relative mb-6">
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-800 text-xs tracking-widest uppercase">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "Product Image"
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase mb-1">
                    {product.categories?.name || "Premium Audio"}
                  </p>
                  <h4 className="text-lg font-light tracking-tight text-white group-hover:text-gold transition-colors duration-300">{product.name}</h4>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-dashed border-white/10">
                <p className="text-zinc-500 text-sm">No featured products found. Check the CMS to feature some products!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#050505] py-24 px-6 md:px-12 border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-4">Audition Notes</h2>
            <h3 className="text-4xl font-light tracking-tight text-white">The Experience</h3>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="relative p-8 border border-white/5 bg-black">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" className="text-gold">
                      <path d="M10 20c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm16 0c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zM10 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm16 0c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                    </svg>
                  </div>
                  <p className="text-zinc-400 italic mb-8 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <h4 className="text-white font-medium tracking-wide">{testimonial.customer_name}</h4>
                    <p className="text-xs text-gold uppercase tracking-widest mt-1">{testimonial.company}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-zinc-500 text-sm italic">Sharing excellence through the ears of our clients. Coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="w-full bg-black py-24 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-2">Field Notes</h2>
              <h3 className="text-3xl font-light tracking-tight text-white">Latest from Harrison</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {blogPosts && blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <BlogCard key={post.id} post={post as any} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-dashed border-white/5">
                <p className="text-zinc-500 text-sm">Our journal is currently empty. Stay tuned for audio insights.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
