"use client";

import React from "react";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export const Hero = () => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-20">
            {/* Background Animated Spotlight */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full animate-soft-float" />
                <div className="absolute bottom-[0%] right-[-5%] w-[30%] h-[30%] bg-gold/5 blur-[100px] rounded-full animate-soft-float [animation-delay:2s]" />
            </div>

            {/* Background Subtle Gradient/Shadow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,10,10,0.8)_0%,rgba(0,0,0,1)_100%)]" />

            {/* Subtle Grain Effect Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center md:px-12">
                <Reveal>
                    <h2 className="mb-4 text-xs font-semibold tracking-[0.4em] text-gold uppercase animate-gold-shimmer">
                        Engineered in Colorado, USA
                    </h2>
                </Reveal>

                <Reveal delay={200}>
                    <div className="animate-soft-float [animation-duration:8s]">
                        <h1 className="mb-8 text-6xl font-light tracking-tighter text-white md:text-8xl lg:text-9xl">
                            UNCOMPROMISED <br />
                            <span className="italic font-serif">POWER.</span>
                        </h1>
                    </div>
                </Reveal>

                <Reveal delay={400}>
                    <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400 font-light tracking-wide">
                        The original pioneer of Voltage Stepup Stabilizer technology since 2008.
                        Competition-grade power supplies designed for pure current, optimal voltage, and uncompromised sound quality.
                    </p>
                </Reveal>

                <Reveal delay={600}>
                    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                        <Button variant="primary" size="lg" href="/products">
                            Explore Collection
                        </Button>
                        <Button variant="outline" size="lg" href="/about">
                            Our Story
                        </Button>
                    </div>
                </Reveal>
            </div>

            {/* Hero Footnote */}
            <div className="absolute bottom-12 left-0 right-0 z-10 text-center">
                <div className="inline-block h-12 w-[1px] bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            </div>
        </section>
    );
};
