"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

interface Category {
    id: string;
    name: string;
}

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [originalSlug, setOriginalSlug] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category_id: "",
        description: "",
        price: "",
        brand: "",
        origin: "USA",
        availability: "in_stock",
        featured: false,
    });

    useEffect(() => {
        if (id) {
            fetchCategories();
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const fetchProduct = async () => {
        try {
            // Find product by ID
            const res = await fetch("/api/products");
            const data = await res.json();
            const product = data.find((p: any) => p.id === id);

            if (product) {
                setFormData({
                    name: product.name || "",
                    slug: product.slug || "",
                    category_id: product.category_id || "",
                    description: product.description || "",
                    price: product.price?.toString() || "",
                    brand: product.brand || "",
                    origin: product.origin || "USA",
                    availability: product.availability || "in_stock",
                    featured: product.featured || false,
                });
                setOriginalSlug(product.slug || "");
                setImages(product.images || []);
            } else {
                setError("Product not found");
            }
        } catch (err) {
            setError("Failed to fetch product");
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            name,
            slug: generateSlug(name),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            // Use the original slug to identify the product in the API
            const res = await fetch(`/api/products/${originalSlug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    images: images,
                    price: formData.price ? parseFloat(formData.price) : null,
                }),
            });

            if (res.ok) {
                router.push("/admin/products");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to update product");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="text-zinc-400">Loading product details...</div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                    Product Management
                </p>
                <h1 className="text-4xl font-light tracking-tight text-white">
                    Edit Product
                </h1>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 border border-red-500/20 bg-red-500/10 p-4 text-red-500">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Images Section */}
                <div className="border border-white/10 p-6 bg-surface/5">
                    <label className="block text-sm font-semibold tracking-widest text-gold uppercase mb-6">
                        Product Images
                    </label>
                    <ImageUpload
                        images={images}
                        onUpload={(url) => setImages([...images, url])}
                        onRemove={(url) => setImages(images.filter(i => i !== url))}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm text-zinc-400 mb-2">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                        />
                    </div>

                    {/* Slug */}
                    <div className="md:col-span-2">
                        <label className="block text-sm text-zinc-400 mb-2">
                            Slug (URL) *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) =>
                                setFormData({ ...formData, slug: e.target.value })
                            }
                            className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category_id}
                            onChange={(e) =>
                                setFormData({ ...formData, category_id: e.target.value })
                            }
                            className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">Brand</label>
                        <input
                            type="text"
                            value={formData.brand}
                            onChange={(e) =>
                                setFormData({ ...formData, brand: e.target.value })
                            }
                            className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Price (IDR)
                        </label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: e.target.value })
                            }
                            className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                        />
                    </div>

                    {/* Origin */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">Origin</label>
                        <input
                            type="text"
                            value={formData.origin}
                            onChange={(e) =>
                                setFormData({ ...formData, origin: e.target.value })
                            }
                            className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                        />
                    </div>

                    {/* Availability */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Availability
                        </label>
                        <select
                            value={formData.availability}
                            onChange={(e) =>
                                setFormData({ ...formData, availability: e.target.value })
                            }
                            className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                            <option value="in_stock">In Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                            <option value="pre_order">Pre Order</option>
                        </select>
                    </div>

                    {/* Featured */}
                    <div className="flex items-center gap-3 md:col-span-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) =>
                                setFormData({ ...formData, featured: e.target.checked })
                            }
                            className="w-4 h-4 bg-black border border-white/10 focus:border-gold"
                        />
                        <label htmlFor="featured" className="text-sm text-zinc-400">
                            Feature this product on homepage
                        </label>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm text-zinc-400 mb-2">
                            Description
                        </label>
                        <textarea
                            rows={6}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-white/5">
                    <button
                        type="submit"
                        disabled={saving}
                        className="border border-gold px-8 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Update Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="border border-white/10 px-8 py-3 text-sm font-medium tracking-widest text-zinc-400 uppercase hover:border-white/20 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
