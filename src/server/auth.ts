import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { eq, lt } from "drizzle-orm";
import { ulid } from "ulidx";
import { getDb } from "~/db";
import { adminSessions } from "~/db/schema";
import { loginSchema } from "~/lib/schemas/auth";
import { rateLimit } from "~/server/rate-limit";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function getEnv() {
  return import("cloudflare:workers").then(({ env }) => env as Record<string, unknown>);
}

async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [hashA, hashB] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  return crypto.subtle.timingSafeEqual(hashA, hashB);
}

export const login = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    rateLimit("auth-login", 5, 60000);

    let adminPassword: string | undefined;
    try {
      const env = await getEnv();
      adminPassword = env.ADMIN_PASSWORD as string | undefined;
    } catch {
      adminPassword = process.env.ADMIN_PASSWORD;
    }

    if (!adminPassword || !(await timingSafeEqual(data.password, adminPassword))) {
      throw new Error("Invalid password");
    }

    const sessionId = ulid();
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

    try {
      const env = await getEnv();
      const d1 = env.DB as D1Database | undefined;
      if (d1) {
        const db = getDb(d1);
        await db.delete(adminSessions).where(lt(adminSessions.expiresAt, now));
        await db.insert(adminSessions).values({
          id: sessionId,
          createdAt: now,
          expiresAt,
        });
      }
    } catch {
      console.error(JSON.stringify({ event: "session_create_failed", reason: "D1 unavailable" }));
    }

    setCookie(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_TTL_MS / 1000,
    });

    return { success: true };
  });

export const validateAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const sessionId = getCookie(SESSION_COOKIE);
  if (!sessionId) {
    return { valid: false };
  }

  try {
    const env = await getEnv();
    const d1 = env.DB as D1Database | undefined;
    if (d1) {
      const db = getDb(d1);
      const session = await db
        .select()
        .from(adminSessions)
        .where(eq(adminSessions.id, sessionId))
        .get();

      if (!session || new Date(session.expiresAt) < new Date()) {
        return { valid: false };
      }
      return { valid: true };
    }
  } catch {
    console.error(JSON.stringify({ event: "auth_validation_failed", reason: "D1 unavailable" }));
    return { valid: false };
  }

  return { valid: false };
});

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const sessionId = getCookie(SESSION_COOKIE);

  if (sessionId) {
    try {
      const env = await getEnv();
      const d1 = env.DB as D1Database | undefined;
      if (d1) {
        const db = getDb(d1);
        await db.delete(adminSessions).where(eq(adminSessions.id, sessionId));
      }
    } catch {
      // Session cleanup best-effort
    }
  }

  setCookie(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return { success: true };
});
