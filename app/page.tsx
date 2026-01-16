import { Hero } from "@/components/ui/Hero";
import Link from "next/link";
import Script from "next/script";
import { supabase } from "@/lib/supabase";
import BlogCard from "@/components/BlogCard";
import { Reveal } from "@/components/ui/Reveal";

export const dynamic = 'force-dynamic';

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

  // Fetch featured dealers
  const { data: featuredDealers } = await supabase
    .from('dealers')
    .select('*')
    .eq('status', 'active')
    .limit(3);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Hero />

      {/* Heritage / VSS Story Section */}
      <Reveal>
        <section className="w-full bg-[#050505] py-24 px-8 md:px-12 border-b border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-6">The Original VSS</h2>
                <h3 className="text-4xl font-light tracking-tight text-white mb-8">Pioneering Power <br />Since 2008</h3>
                <p className="text-zinc-400 text-lg font-light leading-relaxed mb-6">
                  Engineered by Harrison Labs in Colorado, USA, the <span className="gold-text font-medium">VSS (Voltage Stepup Stabilizer)</span>{" "}
                  defined a new category in car audio competition. While others have attempted to follow, the real VSS
                  remains the benchmark for pure, constant current.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  Designed to eliminate interference and ensure optimal voltage, our power supplies are the secret
                  behind world-class sound quality in high-end systems globally.
                </p>
                <div className="flex flex-wrap gap-4 text-[10px] tracking-[0.3em] uppercase text-zinc-600">
                  <span>Indonesia</span>
                  <span className="text-gold/30">•</span>
                  <span>Malaysia</span>
                  <span className="text-gold/30">•</span>
                  <span>Singapore</span>
                  <span className="text-gold/30">•</span>
                  <span>Japan</span>
                  <span className="text-gold/30">•</span>
                  <span>Poland</span>
                  <span className="text-gold/30">•</span>
                  <span>Taiwan</span>
                  <span className="text-gold/30">•</span>
                  <span>India</span>
                </div>
              </div>
              <div className="relative aspect-square bg-zinc-900 border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-6xl font-serif italic text-white/50 mb-4">HL</span>
                    <span className="block text-xs tracking-[0.5em] text-gold uppercase">USA Made</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Featured Products / Collections Section */}
      <Reveal>
        <section className="w-full bg-black py-24 px-8 md:px-12">
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
      </Reveal>

      {/* Testimonials Section */}
      <Reveal>
        <section className="w-full bg-[#050505] py-24 px-8 md:px-12 border-y border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-4">Voices of Excellence</h2>
              <h3 className="text-4xl font-light tracking-tight text-white">Client Experiences</h3>
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
      </Reveal>

      {/* Dealers & Global Network Section */}
      <Reveal>
        <section className="w-full bg-black py-24 px-8 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 border-b border-white/5 pb-8 flex items-end justify-between">
              <div>
                <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-2">Official Network</h2>
                <h3 className="text-3xl font-light tracking-tight text-white">Authorized Partners</h3>
              </div>
              <Link href="/dealers" className="text-xs font-medium tracking-widest text-zinc-400 uppercase hover:text-gold transition-colors">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {featuredDealers && featuredDealers.length > 0 ? (
                featuredDealers.map((dealer) => (
                  <a
                    key={dealer.id}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.name + ' ' + dealer.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border border-white/5 p-8 bg-surface/10 hover:border-gold/30 transition-all duration-500"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-white font-medium group-hover:text-gold transition-colors">{dealer.name}</h4>
                      <svg className="w-4 h-4 text-zinc-600 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-zinc-500 text-sm mb-1">{dealer.city}, {dealer.region}</p>
                    <p className="text-zinc-400 text-xs line-clamp-1">{dealer.address}</p>
                  </a>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-zinc-500 italic">Expanding our presence across the archipelago.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Blog Section */}
      <Reveal>
        <section className="w-full bg-[#050505] py-24 px-8 md:px-12 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-2">The Archive</h2>
                <h3 className="text-3xl font-light tracking-tight text-white">Technical Journal</h3>
              </div>
              <Link href="/blog" className="text-xs font-medium tracking-widest text-zinc-400 uppercase hover:text-gold transition-colors">
                Read More
              </Link>
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
      </Reveal>
    </main>
  );
}
