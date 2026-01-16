"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Products", href: "/products" },
        { name: "Journal", href: "/blog" },
        { name: "About", href: "/about" },
        { name: "Dealers", href: "/dealers" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="PortalAudioShop"
                        width={180}
                        height={40}
                        className="h-10 w-auto object-contain brightness-100"
                    />
                </Link>

                <div className="hidden items-center gap-12 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-gold"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gold focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden border-t border-white/5 bg-black px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-medium tracking-[0.3em] text-zinc-300 uppercase transition-colors hover:text-gold"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};
