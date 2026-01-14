"use client";

import React from "react";
import { Button } from "./Button";

export const Hero = () => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-20">
            {/* Background Subtle Gradient/Shadow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]" />

            {/* Subtle Grain Effect Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center md:px-12">
                <h2 className="mb-4 text-xs font-semibold tracking-[0.4em] text-gold uppercase animate-gold-shimmer">
                    Handcrafted Excellence
                </h2>
                <h1 className="mb-8 text-5xl font-light tracking-tighter text-white md:text-8xl lg:text-9xl">
                    SCULPTING <br />
                    <span className="italic font-serif">SILENCE.</span>
                </h1>
                <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400 font-light tracking-wide">
                    Harrison Laboratory defines the pinnacle of high-fidelity audio instrumentation.
                    Discover a world where engineering meets artistry.
                </p>

                <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                    <Button variant="primary" size="lg" href="/products">
                        Explore Collection
                    </Button>
                    <Button variant="outline" size="lg" href="/about">
                        Our Story
                    </Button>
                </div>
            </div>

            {/* Hero Footnote */}
            <div className="absolute bottom-12 left-0 right-0 z-10 text-center">
                <div className="inline-block h-12 w-[1px] bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            </div>
        </section>
    );
};
