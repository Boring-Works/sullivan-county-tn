import { createFileRoute } from "@tanstack/react-router";
import { About } from "~/components/landing/About";
import { Contact } from "~/components/landing/Contact";
import { Credibility } from "~/components/landing/Credibility";
import { Footer } from "~/components/landing/Footer";
import { Hero } from "~/components/landing/Hero";
import { Methodology } from "~/components/landing/Methodology";
import { Nav } from "~/components/landing/Nav";
import { Products } from "~/components/landing/Products";
import { Services } from "~/components/landing/Services";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-brand-surface selection:bg-brand-gold-muted selection:text-brand-navy">
      <Nav />
      <Hero />
      <Services />
      <Methodology />
      <Products />
      <About />
      <Credibility />
      <Contact />
      <Footer />
    </div>
  );
}
