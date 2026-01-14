"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated" && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [status, router, pathname]);

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="text-gold">Loading...</div>
            </div>
        );
    }

    // Allow the login page to be rendered without a session
    if (pathname === "/admin/login") {
        return <>{children}</>;
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
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface/10 border-b border-white/5 flex items-center justify-between px-6 z-40 backdrop-blur-md">
                <h1 className="text-lg font-light tracking-tight text-gold">Admin</h1>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gold p-2"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Sidebar Overlay (Mobile Only) */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 w-64 border-r border-white/5 bg-surface/10 z-50 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="sticky top-0 h-full flex flex-col">
                    {/* Logo */}
                    <div className="border-b border-white/5 p-6">
                        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                            <h1 className="text-xl font-light tracking-tight text-gold">
                                Portal Audio
                            </h1>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                                Admin Panel
                            </p>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 hover:text-gold hover:bg-white/5 rounded transition-colors"
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div className="border-t border-white/5 p-4">
                        <div className="flex items-center justify-between">
                            <div className="overflow-hidden">
                                <p className="text-sm text-white truncate">{session.user?.email}</p>
                                <p className="text-xs text-zinc-500 capitalize">
                                    {session.user?.role || "Admin"}
                                </p>
                            </div>
                            <Link
                                href="/api/auth/signout"
                                className="text-xs text-zinc-500 hover:text-gold transition-colors ml-2"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-16 md:pt-0">{children}</main>
        </div>
    );
}
