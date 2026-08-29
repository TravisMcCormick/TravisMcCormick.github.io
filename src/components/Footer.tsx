import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { site } from "../content/site";
import { Container } from "./primitives";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-10 text-sm text-ink-dim">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-ink-faint">
          &copy; {year} {site.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-md border border-border transition-colors hover:border-border-bright hover:text-ink"
          >
            <GithubLogo size={18} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center rounded-md border border-border transition-colors hover:border-border-bright hover:text-ink"
          >
            <LinkedinLogo size={18} />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="grid size-9 place-items-center rounded-md border border-border transition-colors hover:border-border-bright hover:text-ink"
          >
            <EnvelopeSimple size={18} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
