"use client";

import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            // 1. Send to local API for CMS record
            const localResponse = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (localResponse.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", message: "" });

                // Silent background notification - Now using ID correctly
                const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_KEY;
                if (formspreeId && formspreeId.length > 5 && !formspreeId.includes('YOUR_')) {
                    // Extract ID if user pasted full URL by mistake
                    const cleanId = formspreeId.includes('formspree.io')
                        ? formspreeId.split('/').pop()
                        : formspreeId;

                    fetch(`https://formspree.io/f/${cleanId}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Accept": "application/json" },
                        body: JSON.stringify(formData),
                    }).then(res => {
                        if (!res.ok) console.warn("Formspree server returned error:", res.status);
                    }).catch(err => {
                        console.warn("Formspree notification blocked/failed (likely network or ad-blocker) but inquiry is saved.");
                    });
                }
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    return (
        <main className="flex min-h-screen flex-col bg-black pt-20">
            {/* Header */}
            <section className="w-full border-b border-white/5 bg-black py-16 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                        Get In Touch
                    </p>
                    <h1 className="text-5xl font-light tracking-tight text-white md:text-6xl">
                        Contact
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="w-full bg-black py-24 px-6 md:px-12">
                <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-8">
                            Send Us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-surface/10 border border-white/5 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-surface/10 border border-white/5 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none transition-colors"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-surface/10 border border-white/5 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none transition-colors"
                                    placeholder="+62 xxx xxxx xxxx"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Message *</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-surface/10 border border-white/5 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none transition-colors resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="border border-gold px-8 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "sending" ? "Sending..." : "Send Message"}
                            </button>

                            {status === "success" && (
                                <p className="text-gold text-sm">Message sent successfully!</p>
                            )}
                            {status === "error" && (
                                <p className="text-red-500 text-sm">Error sending message. Please try again.</p>
                            )}
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-8">
                            Contact Information
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-zinc-500 text-sm mb-2 uppercase tracking-wider">Address</h3>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Jakarta,Indonesia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-300 hover:text-gold transition-colors"
                                >
                                    Jakarta, Indonesia
                                </a>
                            </div>

                            <div>
                                <h3 className="text-zinc-500 text-sm mb-2 uppercase tracking-wider">Email</h3>
                                <a href="mailto:portalaudioshop@gmail.com" className="text-gold hover:text-gold/80 transition-colors">
                                    portalaudioshop@gmail.com
                                </a>
                            </div>

                            <div>
                                <h3 className="text-zinc-500 text-sm mb-2 uppercase tracking-wider">Phone</h3>
                                <a href="tel:+628161956046" className="text-zinc-300 hover:text-gold transition-colors">
                                    +62 816-1956-046
                                </a>
                            </div>

                            <div>
                                <h3 className="text-zinc-500 text-sm mb-2 uppercase tracking-wider">WhatsApp</h3>
                                <a
                                    href="https://wa.me/628161956046"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gold hover:text-gold/80 transition-colors"
                                >
                                    +62 816-1956-046
                                </a>
                            </div>

                            <div>
                                <h3 className="text-zinc-500 text-sm mb-2 uppercase tracking-wider">Business Hours</h3>
                                <p className="text-zinc-300">
                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                    Saturday: 10:00 AM - 4:00 PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
