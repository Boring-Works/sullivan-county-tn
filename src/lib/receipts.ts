import { ulid } from "ulidx";
import { z } from "zod";

export const idempotencyKeySchema = z.string().trim().min(16).max(128);

export function createIdempotencyKey(scope: string): string {
  return `${scope}:${ulid()}`;
}

export function createReceiptId(scope: "MSG" | "FORM" | "FB", id = ulid()): string {
  return `SC-${scope}-${id.slice(-10)}`;
}
