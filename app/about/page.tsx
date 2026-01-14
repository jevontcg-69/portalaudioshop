export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col bg-black pt-20">
            {/* Header */}
            <section className="w-full border-b border-white/5 bg-black py-16 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                        Who We Are
                    </p>
                    <h1 className="text-5xl font-light tracking-tight text-white md:text-6xl">
                        About
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="w-full bg-black py-24 px-6 md:px-12">
                <div className="mx-auto max-w-4xl">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-4">
                                Our Story
                            </h2>
                            <p className="text-lg font-light text-zinc-300 leading-relaxed">
                                Portal Audio Indonesia specializes in importing premium audio accessories
                                from the USA. We are dedicated to bringing world-class audio equipment
                                to Indonesian audiophiles and professionals.
                            </p>
                        </div>

                        <div className="border-t border-white/5 pt-8">
                            <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-4">
                                Our Mission
                            </h2>
                            <p className="text-lg font-light text-zinc-300 leading-relaxed">
                                To provide authentic, high-quality audio accessories from trusted USA
                                manufacturers, ensuring our customers receive genuine products with
                                full warranty and support.
                            </p>
                        </div>

                        <div className="border-t border-white/5 pt-8">
                            <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-4">
                                Why USA Imports
                            </h2>
                            <p className="text-lg font-light text-zinc-300 leading-relaxed">
                                We exclusively import from the USA because of the superior quality
                                standards, rigorous testing, and innovation that American manufacturers
                                bring to audio equipment. Every product we offer meets or exceeds
                                international quality certifications.
                            </p>
                        </div>

                        <div className="border-t border-white/5 pt-8">
                            <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-4">
                                Our Expertise
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <div className="border border-white/5 p-6 bg-surface/10">
                                    <h3 className="text-gold font-semibold mb-2">Voltage Stabilizers</h3>
                                    <p className="text-sm text-zinc-400">
                                        Premium power conditioning for pristine audio performance
                                    </p>
                                </div>
                                <div className="border border-white/5 p-6 bg-surface/10">
                                    <h3 className="text-gold font-semibold mb-2">Capacitor Banks</h3>
                                    <p className="text-sm text-zinc-400">
                                        High-capacity energy storage for consistent power delivery
                                    </p>
                                </div>
                                <div className="border border-white/5 p-6 bg-surface/10">
                                    <h3 className="text-gold font-semibold mb-2">Accessories</h3>
                                    <p className="text-sm text-zinc-400">
                                        Professional-grade components and cables
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
