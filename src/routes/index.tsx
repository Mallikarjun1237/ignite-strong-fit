import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Programs } from "@/components/sections/Programs";
import { Memberships } from "@/components/sections/Memberships";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AK Boxing Club — Premium Boxing Gym in NYC" },
      { name: "description", content: "Train at AK Boxing Club in Lower Manhattan. Small classes, championship coaching, memberships, supplements and diet plans. Black-owned & LGBTQ+ friendly." },
      { property: "og:title", content: "AK Boxing Club — Premium Boxing Gym in NYC" },
      { property: "og:description", content: "Small classes, championship coaching, and a community built for everyone. Book your first class today." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Memberships />
      <Testimonials />
      <Gallery />
      <Faq />
      <Contact />
    </>
  );
}
