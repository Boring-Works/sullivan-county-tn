import { describe, expect, it } from "vitest";
import { externalHandoffs } from "~/data/external-handoffs";

describe("external handoffs", () => {
  const handoffs = Object.values(externalHandoffs);

  it("uses HTTPS and has public ownership context", () => {
    for (const handoff of handoffs) {
      expect(handoff.url).toMatch(/^https:\/\//);
      expect(handoff.owner).toBeTruthy();
      expect(handoff.handoffNote).toMatch(/opens|official|tab/i);
    }
  });

  it("has unique IDs", () => {
    expect(new Set(handoffs.map((handoff) => handoff.id)).size).toBe(handoffs.length);
  });
});
