import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { data: product, error } = await supabase
        .from("products")
        .select("*, categories(*)")
        .eq("slug", slug)
        .single();

    if (error || !product) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col bg-black pt-20">
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-24">
                {/* Breadcrumbs */}
                <nav className="mb-12 flex items-center gap-2 text-xs font-medium tracking-widest text-zinc-500 uppercase">
                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
                    <span>/</span>
                    <span className="text-white">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                    {/* Product Images */}
                    <div className="space-y-6">
                        <div className="aspect-square w-full overflow-hidden bg-surface relative">
                            {product.images?.[0] ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-800 text-xs tracking-widest uppercase">
                                    Product Image
                                </div>
                            )}
                        </div>
                        {/* Thumbnail grid could go here */}
                    </div>

                    {/* Product Info */}
                    <div>
                        <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                            {product.categories?.name || "Premium Audio"}
                        </p>
                        <h1 className="text-4xl font-light tracking-tight text-white md:text-5xl lg:text-6xl mb-6">
                            {product.name}
                        </h1>

                        <div className="mb-8 flex items-center gap-8 border-y border-white/5 py-6">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Price</p>
                                <p className="text-2xl font-light text-white">
                                    {product.price ? `Rp ${product.price.toLocaleString("id-ID")}` : "Contact for Price"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Availability</p>
                                <p className={`text-sm font-medium uppercase tracking-wider ${product.availability === 'in_stock' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {product.availability === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed mb-12">
                            <p>{product.description || "No description available for this product."}</p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <a
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890'}?text=Hello, I'm interested in the ${product.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-gold px-8 py-4 text-center text-sm font-bold tracking-widest text-black uppercase hover:bg-white transition-all duration-300"
                            >
                                Inquire via WhatsApp
                            </a>
                            <Link
                                href="/contact"
                                className="flex-1 border border-white/10 px-8 py-4 text-center text-sm font-medium tracking-widest text-white uppercase hover:border-gold hover:text-gold transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Specifications */}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="mt-16 pt-16 border-t border-white/5">
                                <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-8">Specifications</h2>
                                <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="border-b border-white/5 pb-4">
                                            <dt className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{key}</dt>
                                            <dd className="text-sm text-white">{String(value)}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
