import { Hero } from "@/components/ui/Hero";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  // Fetch featured products
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('featured', true)
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
                <p className="text-zinc-500">No featured products found. Check the CMS to feature some products!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
