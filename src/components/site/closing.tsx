import { ContactForm } from "@/components/site/contact-form";
import { Brand } from "@/components/site/header";
import { contact, footer, nav, site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-titre" className="scroll-mt-16 border-t border-rule-strong bg-paper-deep">
      <div className="mx-auto grid max-w-[84rem] gap-x-10 gap-y-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="contact-titre" className="display text-[clamp(2.75rem,7vw,4.75rem)]">
            {contact.heading.slice(0, -1)}
            <span className="text-minium">.</span>
          </h2>
          <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-ink-soft">{contact.body}</p>
        </div>
        <div className="sheet p-5 shadow-[0_18px_40px_-28px_oklch(0.215_0.022_262/0.55)] sm:p-8 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rule-strong">
      <div className="mx-auto max-w-[84rem] px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <Brand />
          <nav aria-label="Pied de page">
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[0.9375rem] font-medium">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="py-2 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-8 max-w-[62rem] text-[0.9375rem] leading-relaxed text-ink-mute">{footer.legal}</p>
        <p className="mt-3 text-[0.9375rem] text-ink-mute">© 2026 {site.name}</p>
      </div>
    </footer>
  );
}
