"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Testimonial {
    id: string;
    customer_name: string;
    company: string;
    content: string;
    rating: number;
    featured: boolean;
    created_at: string;
}

export default function TestimonialsAdminPage() {
    const router = useRouter();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState({
        customer_name: "",
        company: "",
        content: "",
        rating: 5,
        featured: false,
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/testimonials?featured=false");
            const data = await res.json();
            setTestimonials(data);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (t: Testimonial) => {
        setEditingTestimonial(t);
        setFormData({
            customer_name: t.customer_name,
            company: t.company,
            content: t.content,
            rating: t.rating,
            featured: t.featured,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchTestimonials();
            } else {
                setError("Failed to delete testimonial");
            }
        } catch (err) {
            setError("An error occurred during deletion");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : "/api/testimonials";
            const method = editingTestimonial ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setShowForm(false);
                setEditingTestimonial(null);
                setFormData({ customer_name: "", company: "", content: "", rating: 5, featured: false });
                fetchTestimonials();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save testimonial");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-6xl">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                        Content Management
                    </p>
                    <h1 className="text-4xl font-light tracking-tight text-white">
                        Testimonials
                    </h1>
                </div>
                <button
                    onClick={() => {
                        if (showForm) {
                            setEditingTestimonial(null);
                            setFormData({ customer_name: "", company: "", content: "", rating: 5, featured: false });
                        }
                        setShowForm(!showForm);
                    }}
                    className="border border-gold px-6 py-2 text-xs font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all"
                >
                    {showForm ? "Cancel" : "Add Testimonial"}
                </button>
            </div>

            {error && (
                <div className="mb-6 border border-red-500/20 bg-red-500/10 p-4 text-red-500">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="mb-12 border border-white/10 p-8 bg-surface/5">
                    <h2 className="text-lg font-light text-white mb-6">
                        {editingTestimonial ? `Edit Testimonial: ${editingTestimonial.customer_name}` : "New Testimonial"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Customer Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.customer_name}
                                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Company / Title</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                                    placeholder="e.g., Professional Audiophile"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-zinc-400 mb-2">Content *</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Rating (1-5)</label>
                                <select
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                                >
                                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4 bg-black border border-white/10"
                                />
                                <label htmlFor="featured" className="text-sm text-zinc-400">Featured on homepage</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-gold px-8 py-3 text-sm font-medium tracking-widest text-black uppercase hover:bg-white transition-all disabled:opacity-50"
                        >
                            {saving ? "Saving..." : editingTestimonial ? "Update Testimonial" : "Save Testimonial"}
                        </button>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-zinc-500">Loading testimonials...</div>
                ) : testimonials.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {testimonials.map((t) => (
                            <div key={t.id} className="border border-white/5 p-6 bg-surface/5 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-white font-medium">{t.customer_name}</h3>
                                        <span className="text-xs text-zinc-600">|</span>
                                        <span className="text-xs text-gold uppercase tracking-widest">{t.company}</span>
                                        {t.featured && (
                                            <span className="ml-2 text-[8px] bg-gold/10 text-gold border border-gold/20 px-1 py-0.5 uppercase tracking-tighter">Featured</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-400 italic line-clamp-2">"{t.content}"</p>
                                </div>
                                <div className="flex flex-col items-end gap-4">
                                    <div className="text-gold text-xs">
                                        {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(t)}
                                            className="text-gold hover:text-white transition-colors text-[10px] uppercase tracking-widest"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(t.id)}
                                            className="text-red-500 hover:text-red-400 transition-colors text-[10px] uppercase tracking-widest"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-white/10 p-12 text-center text-zinc-500">
                        No testimonials found. Add your first client review!
                    </div>
                )}
            </div>
        </div>
    );
}
