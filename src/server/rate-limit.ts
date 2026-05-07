import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

/**
 * In-memory rate limiter — per Cloudflare Worker isolate.
 *
 * Caveat: each isolate has its own bucket, so under load Cloudflare may run
 * many isolates and a determined attacker can spread requests across them.
 * Per-IP keys are still essential — global keys (e.g. just "contact") would
 * let one abuser block every other user inside the same isolate.
 *
 * For strict cross-isolate enforcement, migrate to Durable Objects or D1
 * atomic counters; for the traffic level of a county website, IP-keyed
 * in-memory limits are adequate.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(): string {
  try {
    // CF-Connecting-IP is the most reliable source on Cloudflare Workers.
    const cfIp = getRequestHeader("cf-connecting-ip");
    if (typeof cfIp === "string" && cfIp) return cfIp;
    const xff = getRequestHeader("x-forwarded-for");
    if (typeof xff === "string" && xff) return xff.split(",")[0]?.trim() ?? "unknown";
    return getRequestIP() ?? "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * Throws "Too many requests..." when the (key, ip) pair exceeds maxRequests
 * within windowMs. Pass a static key for the action; the IP is appended
 * automatically so users don't share a single global quota.
 */
export function rateLimit(key: string, maxRequests: number, windowMs: number): void {
  const now = Date.now();
  const compositeKey = `${key}:${clientIp()}`;
  const bucket = buckets.get(compositeKey);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(compositeKey, { count: 1, resetAt: now + windowMs });
    return;
  }

  bucket.count++;
  if (bucket.count > maxRequests) {
    throw new Error("Too many requests. Please try again later.");
  }
}
