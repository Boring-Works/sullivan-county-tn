import { describe, expect, it } from "vitest";
import { buildVCard, vCardDataHref } from "~/lib/vcard";

describe("buildVCard", () => {
  it("emits a minimal valid vCard 3.0", () => {
    const v = buildVCard({ fullName: "Jane Doe" });
    expect(v).toContain("BEGIN:VCARD");
    expect(v).toContain("VERSION:3.0");
    expect(v).toContain("FN:Jane Doe");
    expect(v).toContain("END:VCARD");
  });

  it("preserves short codes without country prefix", () => {
    const v = buildVCard({ fullName: "Emergency", phone: "911" });
    expect(v).toContain("TEL;TYPE=WORK,VOICE:911");
    expect(v).not.toContain("+911");
  });

  it("includes optional fields when present", () => {
    const v = buildVCard({
      fullName: "John Sullivan",
      title: "County Mayor",
      organization: "Sullivan County",
      phone: "(423) 323-6417",
      email: "mayor@sullivancountytn.gov",
      address: "3411 TN-126, Blountville, TN 37617",
    });
    expect(v).toContain("TITLE:County Mayor");
    expect(v).toContain("ORG:Sullivan County");
    expect(v).toContain("TEL;TYPE=WORK,VOICE:+14233236417");
    expect(v).toContain("EMAIL;TYPE=WORK:mayor@sullivancountytn.gov");
    expect(v).toContain("ADR;TYPE=WORK:");
  });

  it("omits empty optional fields", () => {
    const v = buildVCard({ fullName: "X" });
    expect(v).not.toContain("TITLE:");
    expect(v).not.toContain("TEL;");
    expect(v).not.toContain("EMAIL;");
  });

  it("produces a data: URL", () => {
    const href = vCardDataHref(buildVCard({ fullName: "Test" }));
    expect(href.startsWith("data:text/vcard;charset=utf-8,")).toBe(true);
    expect(decodeURIComponent(href.split(",")[1])).toContain("FN:Test");
  });
});
