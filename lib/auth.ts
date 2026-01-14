import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return {
            authorized: false,
            response: NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            ),
        };
    }

    return {
        authorized: true,
        user: session.user,
    };
}

export async function requireAdmin() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
        return {
            authorized: false,
            response: NextResponse.json(
                { error: "Forbidden - Admin access required" },
                { status: 403 }
            ),
        };
    }

    return {
        authorized: true,
        user: session.user,
    };
}
