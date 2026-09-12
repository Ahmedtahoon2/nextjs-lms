import { Header } from "@/components/global/layout/header";
import { Footer } from "@/components/global/layout/footer";
import { Hero } from "@/components/global/sections/hero";
import { Features } from "@/components/global/sections/features";
import { Stats } from "@/components/global/sections/stats";
import { CTA } from "@/components/global/sections/cta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
