"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/5 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/logo.png"
                                alt="Harrison Laboratory"
                                width={200}
                                height={45}
                                className="h-10 w-auto object-contain brightness-100"
                            />
                        </Link>
                        <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-6">
                            Redefining the boundaries of power stability and audio performance.
                            Handcrafted precision for those who demand excellence in every note.
                        </p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-3 text-zinc-400 text-sm">
                                <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:portalaudioshop@gmail.com" className="hover:text-gold transition-colors">portalaudioshop@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-400 text-sm">
                                <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+628161956046" className="hover:text-gold transition-colors">+62 816-1956-046</a>
                            </li>
                        </ul>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-gold transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href={`https://wa.me/628161956046`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-gold transition-colors"
                                aria-label="WhatsApp"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.551.921 3.235 1.407 4.956 1.408 5.4 0 9.794-4.394 9.796-9.795.001-2.617-1.02-5.078-2.872-6.93s-4.314-2.872-6.932-2.873c-5.4 0-9.794 4.394-9.795 9.795-.001 1.73.454 3.42 1.316 4.908l1.012-3.693z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Collections</h4>
                        <ul className="space-y-4">
                            <li><Link href="/products?category=voltage-stabilizer" className="text-zinc-500 hover:text-gold transition-colors text-sm">Voltage Stabilizers</Link></li>
                            <li><Link href="/products?category=capacitor-bank" className="text-zinc-500 hover:text-gold transition-colors text-sm">Capacitor Banks</Link></li>
                            <li><Link href="/products?category=power-conditioner" className="text-zinc-500 hover:text-gold transition-colors text-sm">Power Conditioners</Link></li>
                            <li><Link href="/products" className="text-zinc-500 hover:text-gold transition-colors text-sm">All Products</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Experience</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-zinc-500 hover:text-gold transition-colors text-sm">Our Story</Link></li>
                            <li><Link href="/dealers" className="text-zinc-500 hover:text-gold transition-colors text-sm">Official Dealers</Link></li>
                            <li><Link href="/contact" className="text-zinc-500 hover:text-gold transition-colors text-sm">Book a Demo</Link></li>
                            <li><Link href="/blog" className="text-zinc-500 hover:text-gold transition-colors text-sm">Latest News</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
                        © {currentYear} PortalAudioShop. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/contact" className="text-zinc-600 hover:text-gold transition-colors text-[10px] uppercase tracking-widest">
                            Terms & Conditions
                        </Link>
                        <Link href="/contact" className="text-zinc-600 hover:text-gold transition-colors text-[10px] uppercase tracking-widest">
                            Privacy Policy
                        </Link>
                        <Link href="/admin" className="text-zinc-600 hover:text-gold transition-colors text-[10px] uppercase tracking-widest">
                            Admin Access
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
