import type { ReactNode } from "react";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  LinkedinLogo,
  GithubLogo,
} from "@phosphor-icons/react";

import { PageMeta } from "../components/PageMeta";
import { PageHeader } from "../components/PageHeader";
import { Container, Reveal } from "../components/primitives";
import { site } from "../content/site";

type Row = { icon: ReactNode; label: string; value: string; href?: string };

const ROWS: Row[] = [
  {
    icon: <EnvelopeSimple size={18} />,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  { icon: <Phone size={18} />, label: "Phone", value: site.phone, href: site.phoneHref },
  { icon: <MapPin size={18} />, label: "Location", value: site.location },
  {
    icon: <LinkedinLogo size={18} />,
    label: "LinkedIn",
    value: "linkedin.com/in/travissmccormick",
    href: site.linkedin,
  },
  {
    icon: <GithubLogo size={18} />,
    label: "GitHub",
    value: "github.com/TravisMcCormick",
    href: site.github,
  },
];

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Get in touch with Travis McCormick by email, phone, LinkedIn, or GitHub."
      />
      <PageHeader kicker="./CONTACT" title="Contact" />

      <Container className="py-14">
        <Reveal>
          <p className="max-w-[60ch] text-[15px] text-ink-dim">
            Feel free to reach out if you want to talk about opportunities, projects, or just
            connect. I'm always down to chat about cybersecurity, building stuff, or whatever.
          </p>
        </Reveal>

        <div className="mt-8 max-w-xl divide-y divide-border overflow-hidden rounded-[12px] border border-border">
          {ROWS.map((row, i) => {
            const inner = (
              <>
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-surface-2 text-accent">
                  {row.icon}
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                    {row.label}
                  </span>
                  <span className="text-sm text-ink">{row.value}</span>
                </span>
              </>
            );
            return (
              <Reveal key={row.label} delay={i * 0.04}>
                {row.href ? (
                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2/60"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 px-5 py-4">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </>
  );
}
