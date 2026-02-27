import { createFileRoute } from "@tanstack/react-router";
import { DepartmentCategories } from "~/components/home/DepartmentCategories";
import { HeroBanner } from "~/components/home/HeroBanner";
import { NewsSection } from "~/components/home/NewsSection";
import { QuickServices } from "~/components/home/QuickServices";
import { MountainDivider, MountainDividerInverted } from "~/components/shared/MountainDivider";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <HeroBanner />
      <QuickServices />
      <MountainDivider fill="var(--color-brand-parchment)" />
      <DepartmentCategories />
      <MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />
      <NewsSection />
    </main>
  );
}
