const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, maxRequests: number, windowMs: number): void {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  bucket.count++;
  if (bucket.count > maxRequests) {
    throw new Error("Too many requests. Please try again later.");
  }

  if (now > bucket.resetAt) {
    bucket.count = 1;
    bucket.resetAt = now + windowMs;
  }
}
