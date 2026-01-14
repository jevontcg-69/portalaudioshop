"use client";

import { useEffect, useState } from "react";

interface Dealer {
    id: string;
    name: string;
    city: string;
    region: string;
    phone: string;
    email: string;
    status: string;
}

export default function DealersPage() {
    const [dealers, setDealers] = useState<Dealer[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        region: "",
        phone: "",
        email: "",
        status: "active",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchDealers();
    }, []);

    const fetchDealers = async () => {
        try {
            const res = await fetch("/api/dealers");
            const data = await res.json();
            setDealers(data);
        } catch (err) {
            console.error("Error fetching dealers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/dealers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSuccess("Dealer created successfully!");
                setFormData({
                    name: "",
                    address: "",
                    city: "",
                    region: "",
                    phone: "",
                    email: "",
                    status: "active",
                });
                setShowForm(false);
                fetchDealers();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to create dealer");
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
                        Network Management
                    </p>
                    <h1 className="text-4xl font-light tracking-tight text-white">
                        Dealers
                    </h1>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="border border-gold px-6 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all"
                >
                    {showForm ? "Cancel" : "+ Add Dealer"}
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

            {/* Add Dealer Form */}
            {showForm && (
                <div className="mb-8 border border-white/5 bg-surface/10 p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">
                        Add New Dealer
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Dealer Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                    placeholder="Portal Audio Jakarta"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                    placeholder="Jakarta"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Region *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.region}
                                    onChange={(e) =>
                                        setFormData({ ...formData, region: e.target.value })
                                    }
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                    placeholder="DKI Jakarta"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                    placeholder="+62 21 1234567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                    placeholder="dealer@portalaudio.id"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({ ...formData, status: e.target.value })
                                    }
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Address *
                                </label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none resize-none"
                                    placeholder="Full address"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="border border-gold px-8 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all"
                        >
                            Add Dealer
                        </button>
                    </form>
                </div>
            )}

            {/* Dealers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dealers.map((dealer) => (
                    <div
                        key={dealer.id}
                        className="border border-white/5 bg-surface/10 p-6 hover:border-gold/20 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white">
                                {dealer.name}
                            </h3>
                            <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded uppercase ${dealer.status === "active"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {dealer.status}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 mb-1">{dealer.city}</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
                            {dealer.region}
                        </p>
                        {dealer.phone && (
                            <p className="text-sm text-zinc-400">📞 {dealer.phone}</p>
                        )}
                        {dealer.email && (
                            <p className="text-sm text-zinc-400">✉️ {dealer.email}</p>
                        )}
                    </div>
                ))}
            </div>

            {dealers.length === 0 && (
                <div className="border border-white/5 bg-surface/10 p-12 text-center text-zinc-500">
                    No dealers yet. Add your first dealer above.
                </div>
            )}
        </div>
    );
}
