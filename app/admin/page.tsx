"use client";

import { useEffect, useState } from "react";

interface Stats {
    totalProducts: number;
    totalInquiries: number;
    pendingInquiries: number;
    totalDealers: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalProducts: 0,
        totalInquiries: 0,
        pendingInquiries: 0,
        totalDealers: 0,
    });

    useEffect(() => {
        // Fetch stats from API endpoints
        const fetchStats = async () => {
            try {
                const [products, inquiries, dealers] = await Promise.all([
                    fetch("/api/products").then((r) => r.json()),
                    fetch("/api/inquiries").then((r) => r.json()),
                    fetch("/api/dealers").then((r) => r.json()),
                ]);

                setStats({
                    totalProducts: products?.length || 0,
                    totalInquiries: inquiries?.length || 0,
                    pendingInquiries:
                        inquiries?.filter((i: any) => i.status === "new").length || 0,
                    totalDealers: dealers?.length || 0,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            label: "Total Products",
            value: stats.totalProducts,
            icon: "📦",
            color: "gold",
        },
        {
            label: "Pending Inquiries",
            value: stats.pendingInquiries,
            icon: "✉️",
            color: "red-500",
        },
        {
            label: "Total Inquiries",
            value: stats.totalInquiries,
            icon: "📨",
            color: "zinc-400",
        },
        {
            label: "Active Dealers",
            value: stats.totalDealers,
            icon: "🏪",
            color: "zinc-400",
        },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                    Admin Panel
                </p>
                <h1 className="text-4xl font-light tracking-tight text-white">
                    Dashboard
                </h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat) => (
                    <div
                        key={stat.label}
                        className="border border-white/5 bg-surface/10 p-6 hover:border-gold/20 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">{stat.icon}</span>
                            <span className={`text-3xl font-light text-${stat.color}`}>
                                {stat.value}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 uppercase tracking-wider">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-6">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/products"
                        className="border border-white/5 bg-surface/10 p-6 hover:border-gold hover:bg-gold/5 transition-all group"
                    >
                        <span className="text-2xl mb-2 block">➕</span>
                        <h3 className="text-white font-semibold mb-1 group-hover:text-gold transition-colors">
                            Add Product
                        </h3>
                        <p className="text-sm text-zinc-500">
                            Create a new product listing
                        </p>
                    </a>

                    <a
                        href="/admin/inquiries"
                        className="border border-white/5 bg-surface/10 p-6 hover:border-gold hover:bg-gold/5 transition-all group"
                    >
                        <span className="text-2xl mb-2 block">📬</span>
                        <h3 className="text-white font-semibold mb-1 group-hover:text-gold transition-colors">
                            View Inquiries
                        </h3>
                        <p className="text-sm text-zinc-500">
                            Manage customer inquiries
                        </p>
                    </a>

                    <a
                        href="/admin/users"
                        className="border border-white/5 bg-surface/10 p-6 hover:border-gold hover:bg-gold/5 transition-all group"
                    >
                        <span className="text-2xl mb-2 block">👤</span>
                        <h3 className="text-white font-semibold mb-1 group-hover:text-gold transition-colors">
                            Manage Users
                        </h3>
                        <p className="text-sm text-zinc-500">
                            Add or remove admin users
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
}
