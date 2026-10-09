import { Contact, Footer } from "@/components/site/closing";
import { Faq } from "@/components/site/faq";
import { Header } from "@/components/site/header";
import { Anatomy, Hero, Maker, Packs, Problem, Process, Siem } from "@/components/site/sections";

export default function Home() {
  return (
    <>
      <a
        href="#fiche"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-paper"
      >
        Aller au contenu
      </a>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Anatomy />
        <Siem />
        <Process />
        <Packs />
        <Maker />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
