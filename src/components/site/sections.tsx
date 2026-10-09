import { ArrowDown, ArrowRight, Check, Minus } from "lucide-react";
import { Datasheet } from "@/components/site/datasheet";
import { anatomy, hero, maker, packs, problem, process, siem, site } from "@/content/site";

const WRAP = "mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-10";
const H2 = "display text-[clamp(2.25rem,5.2vw,3.75rem)]";

export function Hero() {
  return (
    <div id="haut" className={`${WRAP} scroll-mt-24 pt-10 pb-20 sm:pt-14 lg:pt-16 lg:pb-28`}>
      <div className="grid items-end gap-x-10 gap-y-7 pb-12 lg:grid-cols-12 lg:pb-14">
        <h1 className="display text-[clamp(3.25rem,13vw,6rem)] leading-[1.05] lg:col-span-7">
          {hero.headline[0]}
          <br />
          {hero.headline[1].slice(0, -1)}
          <span className="text-minium">.</span>
        </h1>
        <div className="lg:col-span-5">
          <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed">{hero.lead}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="#contact" className="btn btn-primary">
              {site.cta}
              <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden="true" />
            </a>
            <a href="#fiche" className="link inline-flex items-center gap-2">
              {hero.secondary}
              <ArrowDown className="size-4" strokeWidth={2.25} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <Datasheet />
    </div>
  );
}

export function Problem() {
  return (
    <section aria-labelledby="probleme-titre" className="border-y border-rule-strong bg-paper-deep">
      <div className={`${WRAP} grid grid-cols-1 gap-x-10 gap-y-10 py-20 lg:grid-cols-12 lg:py-28`}>
        <div className="min-w-0 lg:col-span-5">
          <h2 id="probleme-titre" className={H2}>
            {problem.heading}
          </h2>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">{problem.body}</p>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <p aria-hidden="true" className="grid grid-cols-2 gap-x-4 border-b-[1.5px] border-rule-strong pb-3 text-[0.9375rem] sm:hidden">
            <span className="font-medium text-ink-mute">{problem.left}</span>
            <span className="font-semibold">{problem.right}</span>
          </p>
          <table className="block w-full border-collapse text-left sm:table">
            <thead className="sr-only sm:not-sr-only sm:table-header-group">
              <tr className="border-b-[1.5px] border-rule-strong align-bottom">
                <th scope="col" className="sr-only">
                  Sujet
                </th>
                <th scope="col" className="w-[38%] pr-4 pb-3 text-[0.9375rem] font-medium text-ink-mute">
                  {problem.left}
                </th>
                <th scope="col" className="pb-3 text-[0.9375rem] font-semibold">
                  {problem.right}
                </th>
              </tr>
            </thead>
            <tbody className="block sm:table-row-group">
              {problem.rows.map((row) => (
                <tr key={row.topic} className="grid grid-cols-2 gap-x-4 border-b border-rule sm:table-row">
                  <th scope="row" className="col-span-2 pt-4 font-semibold sm:pr-4 sm:w-[24%] sm:py-4 sm:align-top">
                    {row.topic}
                  </th>
                  <td className="pt-1 pb-4 text-ink-mute sm:py-4 sm:pr-4 sm:align-top">
                    <span className="flex gap-2">
                      <Minus className="mt-1.5 size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                      {row.without}
                    </span>
                  </td>
                  <td className="pt-1 pb-4 sm:py-4 sm:align-top">
                    <span className="flex gap-2">
                      <Check className="mt-1.5 size-4 shrink-0 text-minium-deep" strokeWidth={2.5} aria-hidden="true" />
                      {row.with}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Anatomy() {
  return (
    <section id="contenu" aria-labelledby="contenu-titre" className={`${WRAP} scroll-mt-16 py-20 lg:py-28`}>
      <div className="grid items-end gap-x-10 gap-y-5 lg:grid-cols-12">
        <h2 id="contenu-titre" className={`${H2} lg:col-span-7`}>
          {anatomy.heading}
        </h2>
        <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft lg:col-span-5">{anatomy.body}</p>
      </div>
      <ol className="mt-12 grid border-t-[1.5px] border-rule-strong md:grid-cols-2 md:gap-x-10">
        {anatomy.parts.map((part) => (
          <li key={part.mark} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-rule py-6">
            <span aria-hidden="true" className="mark mt-1 inline-grid size-6 place-items-center bg-ink text-paper">
              {part.mark}
            </span>
            <div>
              <h3 className="text-xl font-semibold leading-7">{part.name}</h3>
              <p className="mt-1.5 max-w-[30rem] text-ink-soft">{part.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Siem() {
  return (
    <section id="siem" aria-labelledby="siem-titre" className="scroll-mt-16 bg-plate text-plate-text">
      <div className={`${WRAP} grid gap-x-10 gap-y-10 py-20 lg:grid-cols-12 lg:py-28`}>
        <div className="lg:col-span-5">
          <h2 id="siem-titre" className={H2}>
            {siem.heading}
          </h2>
          <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-plate-mute">{siem.body}</p>
        </div>
        <div className="lg:col-span-7">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-[1.5px] border-plate-text">
                {siem.columns.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={`pb-3 text-[0.9375rem] font-medium text-plate-mute ${index === 2 ? "hidden sm:table-cell" : "pr-4"}`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {siem.rows.map((row) => (
                <tr key={row.platform} className="border-b border-plate-rule align-baseline">
                  <th scope="row" className="py-4 pr-4 text-lg font-semibold sm:w-[34%]">
                    {row.platform}
                    <span className="mt-1 block text-[0.9375rem] font-normal text-plate-mute sm:hidden">{row.format}</span>
                  </th>
                  <td className="py-4 pr-4 font-mono text-[0.9375rem] font-medium text-plate-key sm:w-[18%]">{row.language}</td>
                  <td className="hidden py-4 text-plate-mute sm:table-cell">{row.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section aria-labelledby="methode-titre" className={`${WRAP} py-20 lg:py-28`}>
      <h2 id="methode-titre" className={`${H2} max-w-[18ch]`}>
        {process.heading}
      </h2>
      <ol className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, index) => (
          <li key={step.name} className="relative border-t-[1.5px] border-rule-strong pt-5 pb-10">
            <span aria-hidden="true" className="absolute -top-[5px] left-0 size-[9px] bg-minium" />
            <span aria-hidden="true" className="display block text-5xl text-ink">
              {index + 1}
            </span>
            <h3 className="mt-3 text-xl font-semibold leading-7">{step.name}</h3>
            <p className="mt-1.5 max-w-[26rem] text-ink-soft">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Packs() {
  return (
    <section id="packs" aria-labelledby="packs-titre" className="scroll-mt-16 border-y border-rule-strong bg-paper-deep">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="grid items-end gap-x-10 gap-y-5 lg:grid-cols-12">
          <h2 id="packs-titre" className={`${H2} lg:col-span-7`}>
            {packs.heading}
          </h2>
          <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft lg:col-span-5">{packs.body}</p>
        </div>
        <ul className="mt-12 border-t-[1.5px] border-rule-strong">
          {packs.items.map((pack) => (
            <li
              key={pack.ref}
              className="group grid gap-x-10 gap-y-4 border-b border-rule py-7 transition-colors duration-300 hover:bg-paper lg:grid-cols-12 lg:px-5"
            >
              <div className="lg:col-span-5">
                <p className="mark text-ink-mute transition-colors duration-300 group-hover:text-minium-deep">{pack.ref}</p>
                <h3 className="display mt-2 text-[2rem]">{pack.name}</h3>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-[38rem] text-lg text-ink">{pack.text}</p>
                <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-[0.9375rem] text-ink-soft sm:grid-cols-2">
                  {pack.techniques.map((technique) => {
                    const [id, ...name] = technique.split(" ");
                    return (
                      <li key={technique} className="flex gap-3">
                        <span className="mark w-[9ch] shrink-0 pt-px text-ink">{id}</span>
                        {name.join(" ")}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <a href="#contact" className="link inline-flex items-center gap-2 text-lg">
            Recevoir la liste complète des use cases
            <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}

export function Maker() {
  return (
    <section aria-labelledby="atelier-titre" className={`${WRAP} grid gap-x-10 gap-y-6 py-20 lg:grid-cols-12 lg:py-28`}>
      <h2 id="atelier-titre" className={`${H2} lg:col-span-7`}>
        {maker.heading}
      </h2>
      <p className="max-w-[34rem] self-end text-lg leading-relaxed text-ink-soft lg:col-span-5">{maker.body}</p>
    </section>
  );
}
