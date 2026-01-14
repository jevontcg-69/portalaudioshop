"use client";

import { useEffect, useState } from "react";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    created_at: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("User created successfully!");
                setFormData({ email: "", password: "", name: "" });
                setShowForm(false);
                fetchUsers();
            } else {
                setError(data.error || "Failed to create user");
            }
        } catch (err) {
            setError("An error occurred");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setSuccess("User deleted successfully!");
                fetchUsers();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to delete user");
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
                        Admin Panel
                    </p>
                    <h1 className="text-4xl font-light tracking-tight text-white">
                        User Management
                    </h1>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="border border-gold px-6 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all"
                >
                    {showForm ? "Cancel" : "+ Add User"}
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

            {/* Add User Form */}
            {showForm && (
                <div className="mb-8 border border-white/5 bg-surface/10 p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">
                        Create New User
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                placeholder="user@portalaudio.id"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">
                                Password *
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:border-gold focus:outline-none"
                                placeholder="John Doe"
                            />
                        </div>

                        <button
                            type="submit"
                            className="border border-gold px-8 py-3 text-sm font-medium tracking-widest text-gold uppercase hover:bg-gold hover:text-black transition-all"
                        >
                            Create User
                        </button>
                    </form>
                </div>
            )}

            {/* Users Table */}
            <div className="border border-white/5">
                <table className="w-full">
                    <thead className="bg-surface/20 border-b border-white/5">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Created
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-sm text-white">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-zinc-400">
                                    {user.name || "—"}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-gold/20 text-gold uppercase">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-zinc-400">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <div className="p-8 text-center text-zinc-500">
                        No users found. Create your first user above.
                    </div>
                )}
            </div>
        </div>
    );
}
