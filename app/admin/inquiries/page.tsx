"use client";

import { useEffect, useState } from "react";

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: string;
    created_at: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await fetch("/api/inquiries");
            const data = await res.json();
            setInquiries(data);
        } catch (err) {
            console.error("Error fetching inquiries:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredInquiries =
        filter === "all"
            ? inquiries
            : inquiries.filter((i) => i.status === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new":
                return "bg-gold/20 text-gold";
            case "in_progress":
                return "bg-blue-500/20 text-blue-400";
            case "resolved":
                return "bg-green-500/20 text-green-400";
            default:
                return "bg-zinc-500/20 text-zinc-400";
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
            <div className="mb-8">
                <p className="text-xs font-semibold tracking-[0.4em] text-gold uppercase mb-3">
                    Customer Management
                </p>
                <h1 className="text-4xl font-light tracking-tight text-white">
                    Inquiries
                </h1>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-2">
                {["all", "new", "in_progress", "resolved"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all ${filter === status
                                ? "border border-gold text-gold"
                                : "border border-white/10 text-zinc-400 hover:border-white/20"
                            }`}
                    >
                        {status === "all" ? "All" : status.replace("_", " ")}
                    </button>
                ))}
            </div>

            {/* Inquiries List */}
            <div className="space-y-4">
                {filteredInquiries.map((inquiry) => (
                    <div
                        key={inquiry.id}
                        className="border border-white/5 bg-surface/10 p-6 hover:border-gold/20 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {inquiry.name}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-zinc-400">
                                    <span>{inquiry.email}</span>
                                    {inquiry.phone && <span>• {inquiry.phone}</span>}
                                    <span>
                                        • {new Date(inquiry.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <span
                                className={`inline-flex px-3 py-1 text-xs font-semibold rounded uppercase ${getStatusColor(
                                    inquiry.status
                                )}`}
                            >
                                {inquiry.status}
                            </span>
                        </div>
                        <div className="border-t border-white/5 pt-4">
                            <p className="text-zinc-300 whitespace-pre-wrap">
                                {inquiry.message}
                            </p>
                        </div>
                    </div>
                ))}

                {filteredInquiries.length === 0 && (
                    <div className="border border-white/5 bg-surface/10 p-12 text-center text-zinc-500">
                        {filter === "all"
                            ? "No inquiries yet."
                            : `No ${filter.replace("_", " ")} inquiries.`}
                    </div>
                )}
            </div>
        </div>
    );
}
