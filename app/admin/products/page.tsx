"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    brand: string;
    availability: string;
    featured: boolean;
    categories?: { name: string };
}

export default function ProductsAdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products/${slug}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchProducts();
            }
        } catch (err) {
            alert("Failed to delete product");
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                        Product Management
                    </p>
                    <h1 className="text-4xl font-light tracking-tight text-white">
                        Products
                    </h1>
                </div>
                <Link
                    href="/admin/products/new"
                    className="border border-gold px-6 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all text-center"
                >
                    + Add Product
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-96 bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                />
            </div>

            {/* Products Table */}
            <div className="border border-white/5 overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-surface/20 border-b border-white/5">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Featured
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredProducts.map((product) => (
                            <tr
                                key={product.id}
                                className="hover:bg-white/5 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-sm font-medium text-white">
                                            {product.name}
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            {product.brand}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-zinc-400">
                                    {product.categories?.name || "—"}
                                </td>
                                <td className="px-6 py-4 text-sm text-white">
                                    {product.price
                                        ? `Rp ${product.price.toLocaleString("id-ID")}`
                                        : "—"}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${product.availability === "in_stock"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {product.availability === "in_stock"
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {product.featured && (
                                        <span className="text-gold text-xl">★</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="text-sm text-gold hover:text-gold/80 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.slug)}
                                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-zinc-500">
                        {searchTerm
                            ? "No products found matching your search."
                            : "No products yet. Add your first product!"}
                    </div>
                )}
            </div>
        </div>
    );
}
