import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt, encrypt } from "@/lib/encryption";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if(!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { openaiApiKey } = await req.json();

        if(!openaiApiKey) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 400 });
        }

        const encryptedKey = encrypt(openaiApiKey);

        await prisma.user.upsert({
            where: { id: userId },
            update: { openaiApiKey: encryptedKey },
            create: { id: userId, openaiApiKey: encryptedKey }
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error saving API Key!!", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { userId } = await auth();
        if(!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { openaiApiKey: true },
        });
        const decryptedKey = user?.openaiApiKey ? decrypt(user.openaiApiKey) : null;

        return NextResponse.json({ openaiApiKey: decryptedKey });
    } catch (err) {
        console.error("Error fetching API key:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}