import { RateLimiterPrisma } from "rate-limiter-flexible";
import { prisma } from "./prisma";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 2;
const PRO_POINTS = 100;
const DURATION = 30 * 24 * 60 * 60; //30 days
const GENERATION_COST = 1;

export async function getUsageTrack() {
    const { has } = await auth();
    const hasProAccess = has({plan: "pro"});

    const usageTracker = new RateLimiterPrisma({
        storeClient: prisma,
        tableName: "Usage",
        points: hasProAccess? PRO_POINTS : FREE_POINTS,
        duration: DURATION,
    });

    return usageTracker;
}

export async function consumedCredits() {
    const { userId } = await auth();

    if(!userId) {
        throw new Error("User not Authenticated!!");
    }

    const usageTracker = await getUsageTrack();
    const result = await usageTracker.consume(userId, GENERATION_COST);

    return result;
};

export async function getUsageStatus() {
    const { userId } = await auth();

    if(!userId) {
        throw new Error("User not Authenticated!!");
    }

    const usageTracker = await getUsageTrack();
    const result = await usageTracker.get(userId);
    return result;
}