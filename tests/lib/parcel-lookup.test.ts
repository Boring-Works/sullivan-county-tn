import { describe, expect, it } from "vitest";
import { parcelLookupSchema } from "../../src/lib/schemas/parcel-lookup";

describe("parcelLookupSchema", () => {
  it("accepts valid addresses, owner names, and parcel IDs", () => {
    expect(parcelLookupSchema.safeParse({ query: "123 Main St" }).success).toBe(true);
    expect(parcelLookupSchema.safeParse({ query: "BLOUNTVILLE" }).success).toBe(true);
    expect(parcelLookupSchema.safeParse({ query: "SMITH JOHN" }).success).toBe(true);
    expect(parcelLookupSchema.safeParse({ query: "001-002-003.00" }).success).toBe(true);
    expect(parcelLookupSchema.safeParse({ query: "O'Brien" }).success).toBe(true);
    expect(parcelLookupSchema.safeParse({ query: "T&T LLC" }).success).toBe(true);
    expect(parcelLookupSchema.safeParse({ query: "100 N/A" }).success).toBe(true);
  });

  it("rejects queries that are too short", () => {
    expect(parcelLookupSchema.safeParse({ query: "ab" }).success).toBe(false);
    expect(parcelLookupSchema.safeParse({ query: "" }).success).toBe(false);
    expect(parcelLookupSchema.safeParse({ query: "  " }).success).toBe(false);
  });

  it("rejects queries that are too long", () => {
    expect(parcelLookupSchema.safeParse({ query: "a".repeat(121) }).success).toBe(false);
  });

  it("rejects unsafe characters", () => {
    expect(parcelLookupSchema.safeParse({ query: "<script>" }).success).toBe(false);
    expect(parcelLookupSchema.safeParse({ query: "abc;evil" }).success).toBe(false);
    expect(parcelLookupSchema.safeParse({ query: "100%20main" }).success).toBe(false);
    expect(parcelLookupSchema.safeParse({ query: "a\nb" }).success).toBe(false);
  });

  it("trims surrounding whitespace", () => {
    const r = parcelLookupSchema.safeParse({ query: "   100 Main   " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.query).toBe("100 Main");
  });
});
