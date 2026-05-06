import { getCookie, setCookie } from "@tanstack/react-start/server";

const CSRF_COOKIE = "csrf_token";
export const CSRF_HEADER = "x-csrf-token";

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function setCsrfCookie(opts?: { maxAge?: number; path?: string; domain?: string }) {
  const token = generateToken();
  setCookie(CSRF_COOKIE, token, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
    ...opts,
  });
  return token;
}

export function validateCsrf(expectedToken: string): void {
  const cookieToken = getCookie(CSRF_COOKIE);
  if (!cookieToken || cookieToken !== expectedToken) {
    throw new Error("Invalid CSRF token");
  }
}
