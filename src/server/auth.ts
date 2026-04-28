import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { getDb } from "~/db";
import { adminSessions } from "~/db/schema";
import { eq, lt } from "drizzle-orm";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getEnv() {
	// Dynamic import for Cloudflare Workers env
	return import("cloudflare:workers").then(({ env }) => env as Record<string, unknown>);
}

export const login = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as Record<string, unknown>;
		if (typeof d.password !== "string" || !d.password.trim()) {
			throw new Error("Password is required");
		}
		return { password: d.password.trim() };
	})
	.handler(async ({ data }) => {
		let adminPassword: string | undefined;
		try {
			const env = await getEnv();
			adminPassword = env.ADMIN_PASSWORD as string | undefined;
		} catch {
			// Fallback for local dev
			adminPassword = process.env.ADMIN_PASSWORD;
		}

		if (!adminPassword || data.password !== adminPassword) {
			throw new Error("Invalid password");
		}

		const sessionId = crypto.randomUUID();
		const now = new Date().toISOString();
		const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

		try {
			const env = await getEnv();
			const d1 = env.DB as D1Database | undefined;
			if (d1) {
				const db = getDb(d1);
				// Clean up expired sessions
				await db.delete(adminSessions).where(lt(adminSessions.expiresAt, now));
				// Create new session
				await db.insert(adminSessions).values({
					id: sessionId,
					createdAt: now,
					expiresAt,
				});
			}
		} catch {
			console.log("Session created locally (D1 unavailable):", sessionId);
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
		// D1 unavailable — allow in dev
	}

	return { valid: true };
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
			// ignore
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
