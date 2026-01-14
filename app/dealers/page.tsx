import { supabase } from "@/lib/supabase";

export default async function DealersPage() {
    const { data: dealers, error } = await supabase
        .from('dealers')
        .select('*')
        .eq('status', 'active')
        .order('city', { ascending: true });

    return (
        <main className="flex min-h-screen flex-col bg-black pt-20">
            {/* Header */}
            <section className="w-full border-b border-white/5 bg-black py-16 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                        Find Us
                    </p>
                    <h1 className="text-5xl font-light tracking-tight text-white md:text-6xl">
                        Authorized Dealers
                    </h1>
                    <p className="mt-4 text-zinc-400 max-w-2xl">
                        Locate our authorized dealers across Indonesia for genuine products and expert service.
                    </p>
                </div>
            </section>

            {/* Dealers List */}
            <section className="w-full bg-black py-24 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12">
                        <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-6">
                            Locations
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dealers && dealers.length > 0 ? (
                            dealers.map((dealer) => (
                                <div
                                    key={dealer.id}
                                    className="border border-white/5 p-6 bg-surface/10 hover:border-gold/20 transition-colors duration-300"
                                >
                                    <h3 className="text-gold font-semibold text-lg mb-2">{dealer.name}</h3>
                                    <p className="text-zinc-400 text-sm mb-1">{dealer.city}</p>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wider">{dealer.region}</p>
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <p className="text-zinc-300 text-sm">{dealer.address}</p>
                                        {dealer.phone && <p className="text-zinc-400 text-sm mt-2">Tel: {dealer.phone}</p>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center border border-dashed border-white/10">
                                <p className="text-zinc-500">Contact us directly to find your nearest authorized representative.</p>
                            </div>
                        )}
                    </div>

                    {/* Become a Dealer */}
                    <div className="mt-16 pt-16 border-t border-white/5">
                        <div className="max-w-2xl">
                            <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-4">
                                Become a Dealer
                            </h2>
                            <p className="text-lg font-light text-zinc-300 leading-relaxed mb-6">
                                Interested in becoming an authorized dealer for Portal Audio Indonesia?
                                We're always looking for partners who share our commitment to quality
                                and customer service.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block border border-gold px-8 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all duration-300"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
