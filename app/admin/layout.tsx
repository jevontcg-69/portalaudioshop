"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="text-gold">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: "📊" },
        { href: "/admin/products", label: "Products", icon: "📦" },
        { href: "/admin/categories", label: "Categories", icon: "🏷️" },
        { href: "/admin/dealers", label: "Dealers", icon: "🏪" },
        { href: "/admin/inquiries", label: "Inquiries", icon: "✉️" },
        { href: "/admin/testimonials", label: "Testimonials", icon: "⭐" },
        { href: "/admin/blog", label: "Blog", icon: "📝" },
        { href: "/admin/users", label: "Users", icon: "👥" },
    ];

    return (
        <div className="flex min-h-screen bg-black">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-surface/10">
                <div className="sticky top-0">
                    {/* Logo */}
                    <div className="border-b border-white/5 p-6">
                        <Link href="/admin">
                            <h1 className="text-xl font-light tracking-tight text-gold">
                                Portal Audio
                            </h1>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                                Admin Panel
                            </p>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 hover:text-gold hover:bg-white/5 rounded transition-colors"
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div className="absolute bottom-0 w-64 border-t border-white/5 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-white">{session.user?.email}</p>
                                <p className="text-xs text-zinc-500 capitalize">
                                    {session.user?.role || "Admin"}
                                </p>
                            </div>
                            <Link
                                href="/api/auth/signout"
                                className="text-xs text-zinc-500 hover:text-gold transition-colors"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
