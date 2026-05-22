import { describe, expect, it } from "vitest";
import { createIdempotencyKey, createReceiptId, idempotencyKeySchema } from "~/lib/receipts";

describe("receipts", () => {
  it("creates stable public receipt IDs", () => {
    expect(createReceiptId("FORM", "01JZ000000ABCDEFGHJKMNPQRS")).toBe("SC-FORM-GHJKMNPQRS");
  });

  it("creates scoped idempotency keys", () => {
    const key = createIdempotencyKey("contact");
    expect(key).toMatch(/^contact:/);
    expect(idempotencyKeySchema.safeParse(key).success).toBe(true);
  });
});
