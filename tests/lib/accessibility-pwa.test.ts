import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const colors = {
  brandNavy: "#0c1e33",
  brandCopper: "#a44d2a",
  brandCopperLight: "#8f4325",
  brandBrass: "#7a6238",
  brandSage: "#3d6b56",
  brandStone: "#756858",
  brandCream: "#faf8f5",
  brandParchment: "#f3efe9",
  brandSurface: "#f0ece5",
  brandSlate: "#2d3038",
  brandSlateLight: "#5c6370",
  brandWarmGray: "#6a6560",
  brandSafety: "#a63d3d",
  brandCommunity: "#356868",
  white: "#ffffff",
};

function luminance(hex: string) {
  const [r, g, b] = hex
    .slice(1)
    .match(/../g)
    ?.map((part) => Number.parseInt(part, 16) / 255)
    .map((channel) =>
      channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    ) ?? [0, 0, 0];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("accessibility and PWA guardrails", () => {
  it("keeps brand text tokens WCAG AA on light civic surfaces", () => {
    const foregrounds = [
      colors.brandSlate,
      colors.brandSlateLight,
      colors.brandStone,
      colors.brandWarmGray,
      colors.brandCopper,
      colors.brandCopperLight,
      colors.brandBrass,
      colors.brandSage,
      colors.brandSafety,
      colors.brandCommunity,
    ];
    const backgrounds = [colors.brandCream, colors.brandParchment, colors.brandSurface];

    for (const foreground of foregrounds) {
      for (const background of backgrounds) {
        expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("keeps white text readable on solid action colors", () => {
    for (const background of [
      colors.brandNavy,
      colors.brandCopper,
      colors.brandCopperLight,
      colors.brandBrass,
      colors.brandSage,
      colors.brandSafety,
    ]) {
      expect(contrastRatio(colors.white, background)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps the manifest installable without locking orientation", () => {
    const manifestPath = join(process.cwd(), "public", "manifest.webmanifest");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

    expect(manifest.name || manifest.short_name).toBeTruthy();
    expect(manifest.start_url).toBe("/");
    expect(manifest.scope).toBe("/");
    expect(manifest.display || manifest.display_override).toBeTruthy();
    expect(manifest.orientation).toBeUndefined();
    expect(manifest.icons.some((icon: { sizes?: string }) => icon.sizes === "192x192")).toBe(true);
    expect(manifest.icons.some((icon: { sizes?: string }) => icon.sizes === "512x512")).toBe(true);
    expect(
      manifest.icons.some((icon: { purpose?: string }) => icon.purpose?.includes("maskable")),
    ).toBe(true);
  });
});
