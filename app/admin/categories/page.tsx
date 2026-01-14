"use client";

import { useEffect, useState } from "react";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
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

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || "",
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setSuccess("Category deleted successfully!");
                fetchCategories();
            } else {
                setError("Failed to delete category");
            }
        } catch (err) {
            setError("An error occurred during deletion");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const url = editingCategory ? `/api/categories/${editingCategory.id}` : "/api/categories";
            const method = editingCategory ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSuccess(editingCategory ? "Category updated successfully!" : "Category created successfully!");
                setFormData({ name: "", slug: "", description: "" });
                setShowForm(false);
                setEditingCategory(null);
                fetchCategories();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save category");
            }
        } catch (err) {
            setError("An error occurred");
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="text-zinc-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                        Product Management
                    </p>
                    <h1 className="text-4xl font-light tracking-tight text-white">
                        Categories
                    </h1>
                </div>
                <button
                    onClick={() => {
                        if (showForm) {
                            setEditingCategory(null);
                            setFormData({ name: "", slug: "", description: "" });
                        }
                        setShowForm(!showForm);
                    }}
                    className="border border-gold px-6 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all"
                >
                    {showForm ? "Cancel" : "+ Add Category"}
                </button>
            </div>

            {/* Messages */}
            {error && (
                <div className="mb-6 border border-red-500/20 bg-red-500/10 p-4 text-red-500">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-6 border border-gold/20 bg-gold/10 p-4 text-gold">
                    {success}
                </div>
            )}

            {/* Add Category Form */}
            {showForm && (
                <div className="mb-8 border border-white/5 bg-surface/10 p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">
                        {editingCategory ? `Edit Category: ${editingCategory.name}` : "Create New Category"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                placeholder="e.g., Voltage Stabilizers"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">
                                Slug *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData({ ...formData, slug: e.target.value })
                                }
                                className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                placeholder="voltage-stabilizers"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none resize-none"
                                placeholder="Category description..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="border border-gold px-8 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all"
                        >
                            {editingCategory ? "Update Category" : "Create Category"}
                        </button>
                    </form>
                </div>
            )}

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="border border-white/5 bg-surface/10 p-6 hover:border-gold/20 transition-colors"
                    >
                        <h3 className="text-lg font-semibold text-white mb-2">
                            {category.name}
                        </h3>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
                            {category.slug}
                        </p>
                        {category.description && (
                            <p className="text-sm text-zinc-400">
                                {category.description}
                            </p>
                        )}
                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-3">
                            <button
                                onClick={() => handleEdit(category)}
                                className="text-gold hover:text-white transition-colors text-[10px] uppercase tracking-widest"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="text-red-500 hover:text-red-400 transition-colors text-[10px] uppercase tracking-widest"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="border border-white/5 bg-surface/10 p-12 text-center text-zinc-500">
                    No categories yet. Create your first category above.
                </div>
            )}
        </div>
    );
}
