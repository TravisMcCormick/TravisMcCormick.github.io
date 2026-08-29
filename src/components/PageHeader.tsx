import type { ReactNode } from "react";
import { Container, Reveal } from "./primitives";

type Props = {
  kicker: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
};

export function PageHeader({ kicker, title, intro, actions }: Props) {
  return (
    <header className="border-b border-border pb-10 pt-14 sm:pt-20">
      <Container>
        <Reveal>
          <div className="mb-3 font-mono text-xs tracking-widest text-accent">{kicker}</div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-[60ch] text-[15px] text-ink-dim">{intro}</p>}
          {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
        </Reveal>
      </Container>
    </header>
  );
}
