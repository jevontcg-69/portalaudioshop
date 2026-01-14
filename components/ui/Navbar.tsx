"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Harrison Laboratory"
                        width={180}
                        height={40}
                        className="h-10 w-auto object-contain brightness-100"
                    />
                </Link>

                <div className="hidden items-center gap-12 md:flex">
                    <Link href="/products" className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-gold">
                        Products
                    </Link>
                    <Link href="/about" className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-gold">
                        About
                    </Link>
                    <Link href="/dealers" className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-gold">
                        Dealers
                    </Link>
                    <Link href="/contact" className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-gold">
                        Contact
                    </Link>
                </div>

                <button className="md:hidden text-gold">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};
