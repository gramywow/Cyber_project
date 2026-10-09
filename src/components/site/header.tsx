import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";
import { nav, site } from "@/content/site";

export function Brand() {
  return (
    <a href="#haut" className="flex items-center gap-2.5" aria-label={`${site.name}, haut de page`}>
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
        <rect x="1.25" y="1.25" width="21.5" height="21.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <rect x="12" y="12" width="7" height="7" className="fill-minium" />
        <path d="M5 5h7M5 5v7" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span className="display text-xl leading-none tracking-[0.02em] whitespace-nowrap sm:text-[1.375rem]">{site.name}</span>
    </a>
  );
}

export function Header() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-rule-strong bg-paper">
      <ScrollProgress className="absolute -bottom-[3px] h-[3px] bg-minium" />
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Brand />
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.9375rem] font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="py-2 underline decoration-transparent decoration-2 underline-offset-[0.5em] transition-[text-decoration-color] duration-200 hover:decoration-minium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="btn btn-primary min-h-10 px-4 py-2 text-[0.9375rem] whitespace-nowrap">
          <span className="sm:hidden">Le catalogue</span>
          <span className="hidden sm:inline">{site.cta}</span>
        </a>
      </div>
    </header>
  );
}
