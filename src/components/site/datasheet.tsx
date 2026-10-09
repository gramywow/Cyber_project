"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { TransitionPanel } from "@/components/motion-primitives/transition-panel";
import { rules, specimen, type Rule, type SiemId } from "@/content/specimen";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const INK = "#141a24";
const PAPER = "#f7f4ed";

/* Repère de nomenclature : se remplit quand la fiche entre dans l'écran, pièce après pièce. */
function Callout({ letter, order, onPlate = false }: { letter: string; order: number; onPlate?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "mark inline-grid size-6 shrink-0 place-items-center border",
        onPlate ? "border-plate-text text-plate-text" : "border-ink text-ink",
      )}
      initial={false}
      whileInView={
        onPlate
          ? { backgroundColor: PAPER, color: INK }
          : { backgroundColor: INK, color: PAPER }
      }
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.5, delay: 0.25 + order * 0.14, ease: EASE }}
    >
      {letter}
    </motion.span>
  );
}

function highlight(line: string, rule: Rule): ReactNode {
  const trimmed = line.trimStart();
  if (trimmed.startsWith(rule.comment)) {
    return <span className="text-plate-mute italic">{line}</span>;
  }

  if (rule.id === "sigma") {
    const match = line.match(/^(\s*(?:-\s)?)([\w|-]+)(:)(.*)$/);
    if (!match) return line;
    const [, indent, key, colon, rest] = match;
    return (
      <>
        {indent}
        <span className="text-plate-key">{key}</span>
        <span className="text-plate-mute">{colon}</span>
        {rest.includes("'") ? <span className="text-plate-string">{rest}</span> : rest}
      </>
    );
  }

  const keywords = new Set(rule.keywords);
  const tokens = line.match(/("[^"]*"|'[^']*'|[A-Za-z_][\w]*|\s+|.)/g) ?? [];
  return tokens.map((token, index) => {
    if (token[0] === '"' || token[0] === "'") {
      return (
        <span key={index} className="text-plate-string">
          {token}
        </span>
      );
    }
    if (token === "|" || keywords.has(token)) {
      return (
        <span key={index} className="text-plate-key">
          {token}
        </span>
      );
    }
    return token;
  });
}

function Code({ rule }: { rule: Rule }) {
  const lines = rule.code.split("\n");
  return (
    <div className="flex grow flex-col">
      <pre
        tabIndex={0}
        aria-label={`Règle ${rule.label} en ${rule.language}`}
        className="code-scroll grow overflow-x-auto px-4 pt-5 pb-6 font-mono text-[0.8125rem] leading-[1.7] sm:px-6"
      >
        <code className="grid min-w-max grid-cols-[2ch_auto] gap-x-5">
          {lines.map((line, index) => (
            <span key={index} className="contents">
              <span aria-hidden="true" className="text-right text-plate-mute select-none">
                {index + 1}
              </span>
              <span className="whitespace-pre">{line === "" ? " " : highlight(line, rule)}</span>
            </span>
          ))}
        </code>
      </pre>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-plate-rule px-4 py-3 text-[0.9375rem] sm:px-6">
        <span className="text-plate-mute">Format livré</span>
        <span className="font-medium text-plate-text">{rule.delivery}</span>
      </p>
    </div>
  );
}

function Block({
  letter,
  order,
  title,
  children,
}: {
  letter: string;
  order: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 px-4 py-5 sm:px-6">
      <Callout letter={letter} order={order} />
      <div className="min-w-0">
        <h3 className="font-semibold leading-6">{title}</h3>
        <div className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{children}</div>
      </div>
    </div>
  );
}

export function Datasheet() {
  const [active, setActive] = useState<SiemId>("splunk");
  const activeIndex = rules.findIndex((rule) => rule.id === active);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = rules[(activeIndex + step + rules.length) % rules.length];
    setActive(next.id);
    document.getElementById(`onglet-${next.id}`)?.focus();
  }

  return (
    <section id="fiche" aria-labelledby="fiche-titre" className="sheet relative scroll-mt-24">
      <header className="grid border-b-[1.5px] border-rule-strong sm:grid-cols-[auto_1fr_auto]">
        <p className="mark border-b border-rule px-4 py-3 sm:border-r sm:border-b-0 sm:px-6">
          <span className="text-ink-mute">Réf.</span> {specimen.ref}
        </p>
        <h2 id="fiche-titre" className="px-4 py-3 font-semibold leading-6 sm:px-6">
          {specimen.title}
        </h2>
        <p className="mark border-t border-rule px-4 py-3 sm:border-t-0 sm:border-l sm:px-6">
          <span className="text-ink-mute">Sévérité</span> {specimen.severity}
        </p>
      </header>

      <div className="grid lg:grid-cols-12">
        <div className="flex min-w-0 flex-col bg-plate text-plate-text lg:col-span-7">
          <div className="flex items-center gap-4 border-b border-plate-rule px-4 py-3 sm:px-6">
            <Callout letter="A" order={0} onPlate />
            <div
              role="tablist"
              aria-label="Langage de la règle"
              onKeyDown={onKeyDown}
              className="code-scroll -my-1 flex min-w-0 gap-1 overflow-x-auto py-1"
            >
              <AnimatedBackground
                defaultValue={active}
                onValueChange={(id) => id && setActive(id as SiemId)}
                className="bg-plate-text"
                transition={{ type: "spring", bounce: 0.12, duration: 0.45 }}
              >
                {rules.map((rule) => (
                  <button
                    key={rule.id}
                    id={`onglet-${rule.id}`}
                    data-id={rule.id}
                    type="button"
                    role="tab"
                    aria-selected={rule.id === active}
                    aria-controls="panneau-regle"
                    tabIndex={rule.id === active ? 0 : -1}
                    className="min-h-11 shrink-0 cursor-pointer items-center px-3.5 text-[0.9375rem] font-medium text-plate-mute transition-colors duration-200 hover:text-plate-text data-[checked=true]:text-plate"
                  >
                    {rule.label}
                  </button>
                ))}
              </AnimatedBackground>
            </div>
          </div>

          <div id="panneau-regle" role="tabpanel" aria-labelledby={`onglet-${active}`} className="flex min-w-0 grow flex-col">
            <TransitionPanel
              className="flex grow flex-col"
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              activeIndex={activeIndex}
              transition={{ duration: 0.4, ease: EASE }}
              variants={{
                enter: { opacity: 0, y: 10, filter: "blur(6px)" },
                center: { opacity: 1, y: 0, filter: "blur(0px)" },
                exit: { opacity: 0, y: -10, filter: "blur(6px)" },
              }}
            >
              {rules.map((rule) => (
                <Code key={rule.id} rule={rule} />
              ))}
            </TransitionPanel>
          </div>
        </div>

        <div className="divide-y divide-rule border-t-[1.5px] border-rule-strong lg:col-span-5 lg:border-t-0 lg:border-l-[1.5px]">
          <Block letter="B" order={1} title="Mapping ATT&CK">
            <p>{specimen.attack.tactic}</p>
            <p>{specimen.attack.technique}</p>
          </Block>
          <Block letter="C" order={2} title="Sources requises">
            <ul>
              {specimen.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </Block>
          <Block letter="D" order={3} title="Faux positifs connus">
            <ul>
              {specimen.falsePositives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-2 text-ink">{specimen.tuning}</p>
          </Block>
          <Block letter="E" order={4} title="Test">
            <p>{specimen.test}</p>
          </Block>
          <Block letter="F" order={5} title="Runbook, premières vérifications">
            <ol className="list-decimal pl-5 marker:text-ink-mute">
              {specimen.runbook.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Block>
        </div>
      </div>

      <motion.p
        className="tampon display pointer-events-none absolute -top-9 right-4 border-[3px] whitespace-nowrap border-minium-deep bg-paper px-3 pt-1 pb-0.5 text-2xl tracking-[0.08em] text-minium-deep sm:-top-10 sm:right-8 sm:text-3xl"
        style={{ rotate: -7 }}
        initial={{ opacity: 0, scale: 1.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
      >
        Spécimen
      </motion.p>
    </section>
  );
}
