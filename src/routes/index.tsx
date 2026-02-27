import { createFileRoute } from "@tanstack/react-router";
import { DepartmentCategories } from "~/components/home/DepartmentCategories";
import { HeroBanner } from "~/components/home/HeroBanner";
import { NewsSection } from "~/components/home/NewsSection";
import { QuickServices } from "~/components/home/QuickServices";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <HeroBanner />
      <QuickServices />
      <DepartmentCategories />
      <NewsSection />
    </main>
  );
}
