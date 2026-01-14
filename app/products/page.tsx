import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ProductsPage() {
    const { data: products, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

    return (
        <main className="flex min-h-screen flex-col bg-black pt-20">
            {/* Header */}
            <section className="w-full border-b border-white/5 bg-black py-16 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                        Our Collection
                    </p>
                    <h1 className="text-5xl font-light tracking-tight text-white md:text-6xl">
                        Products
                    </h1>
                    <p className="mt-4 text-zinc-400 max-w-2xl">
                        Discover our curated selection of premium audio accessories and instrumentation.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="w-full bg-black py-24 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
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
                                    <h4 className="text-lg font-light tracking-tight text-white group-hover:text-gold transition-colors duration-300">
                                        {product.name}
                                    </h4>
                                    <p className="text-sm text-zinc-400 mt-2">
                                        {product.price ? `Rp ${product.price.toLocaleString("id-ID")}` : "Contact for Price"}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center border border-dashed border-white/10">
                                <p className="text-zinc-500">Our product catalog is currently being updated. Please check back soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
