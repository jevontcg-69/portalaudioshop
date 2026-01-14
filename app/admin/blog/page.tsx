"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    instagram_url: string;
    featured_image: string;
    published: boolean;
    published_at: string;
    created_at: string;
}

export default function BlogAdminPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        instagram_url: "",
        featured_image: "",
        published: true,
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog?published=false");
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError("");

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            if (res.ok) {
                const data = await res.json();
                setFormData({ ...formData, featured_image: data.secure_url });
            } else {
                setError("Failed to upload image");
            }
        } catch (err) {
            setError("Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            content: (post as any).content || "",
            excerpt: post.excerpt || "",
            instagram_url: post.instagram_url || "",
            featured_image: post.featured_image || "",
            published: post.published,
        });
        setShowForm(true);
        if (!(post as any).content) {
            fetchPostDetails(post.id);
        }
    };

    const fetchPostDetails = async (id: string) => {
        try {
            const res = await fetch(`/api/blog/${id}`);
            const data = await res.json();
            setFormData(prev => ({ ...prev, content: data.content }));
        } catch (err) {
            console.error("Error fetching post details:", err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchPosts();
            } else {
                setError("Failed to delete post");
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
            const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
            const method = editingPost ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    published_at: formData.published ? (editingPost?.published_at || new Date().toISOString()) : null,
                }),
            });

            if (res.ok) {
                setShowForm(false);
                setEditingPost(null);
                setFormData({ title: "", slug: "", content: "", excerpt: "", instagram_url: "", featured_image: "", published: true });
                fetchPosts();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save blog post");
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
                        Blog Posts
                    </h1>
                </div>
                <button
                    onClick={() => {
                        if (showForm) {
                            setEditingPost(null);
                            setFormData({ title: "", slug: "", content: "", excerpt: "", instagram_url: "", featured_image: "", published: true });
                        }
                        setShowForm(!showForm);
                    }}
                    className="border border-gold px-6 py-2 text-xs font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all"
                >
                    {showForm ? "Cancel" : "New Post"}
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
                        {editingPost ? `Edit Post: ${editingPost.title}` : "New Blog Post"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Slug *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Excerpt</label>
                                <input
                                    type="text"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                                    placeholder="Brief summary for list view..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Featured Image (for homepage)</label>
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-black hover:file:bg-white file:cursor-pointer"
                                    />
                                    {uploading && <p className="text-xs text-gold animate-pulse">Uploading image...</p>}
                                    {formData.featured_image && (
                                        <div className="relative w-40 aspect-video border border-white/10">
                                            <img
                                                src={formData.featured_image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, featured_image: "" })}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Instagram Post URL (for detail page)</label>
                                <input
                                    type="text"
                                    value={formData.instagram_url}
                                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                                    placeholder="https://www.instagram.com/p/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Content (Markdown supported) *</label>
                                <textarea
                                    required
                                    rows={10}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none resize-none font-mono text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-4 h-4 bg-black border border-white/10"
                                />
                                <label htmlFor="published" className="text-sm text-zinc-400">Publish immediately</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-gold px-8 py-3 text-sm font-medium tracking-widest text-black uppercase hover:bg-white transition-all disabled:opacity-50"
                        >
                            {saving ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                        </button>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-zinc-500">Loading posts...</div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {posts.map((post) => (
                            <div key={post.id} className="border border-white/5 p-6 bg-surface/5 flex justify-between items-center">
                                <div>
                                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] uppercase tracking-widest ${post.published ? 'text-green-500' : 'text-zinc-500'}`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                        <span className="text-zinc-700">|</span>
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-zinc-600 text-xs hidden md:block">
                                        /{post.slug}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="text-gold hover:text-white transition-colors text-xs uppercase tracking-widest"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-500 hover:text-red-400 transition-colors text-xs uppercase tracking-widest"
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
                        No journal entries found. Share your first audio insight!
                    </div>
                )}
            </div>
        </div>
    );
}
