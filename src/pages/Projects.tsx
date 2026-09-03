import { GithubLogo } from "@phosphor-icons/react";

import { PageMeta } from "../components/PageMeta";
import { PageHeader } from "../components/PageHeader";
import {
  AnchorButton,
  Badge,
  Container,
  ExternalLink,
  Panel,
  Reveal,
  SectionTitle,
} from "../components/primitives";
import { site } from "../content/site";
import { featuredProjects, projects } from "../content/projects";

export default function Projects() {
  return (
    <>
      <PageMeta
        title="Projects"
        description="A collection of Travis McCormick's work in cybersecurity, embedded systems, and software development, from a handbuilt split keyboard to a React scheduling app."
      />
      <PageHeader
        kicker="ls -la ~/Projects"
        title="My Projects"
        intro="A collection of my work in cybersecurity, embedded systems, and software development"
      />

      <Container className="py-14">
        <SectionTitle kicker="FEATURED">Featured Projects</SectionTitle>
        <div className="space-y-6">
          {featuredProjects.map((p, i) => (
            <Reveal as="article" key={p.title} delay={i * 0.04}>
              <Panel className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-md border border-border-bright bg-surface-2 text-accent">
                    <p.icon size={20} weight="duotone" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                    <p className="mt-0.5 font-mono text-xs text-ink-faint">{p.date}</p>
                  </div>
                </div>

                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-dim">
                  {p.heading}
                </h4>
                <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-ink-dim">
                  {p.paragraphs.map((para, j) => (
                    <p key={j} className="max-w-[70ch]">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                {p.link && (
                  <div className="mt-6">
                    <ExternalLink href={p.link.href} className="inline-flex items-center gap-2">
                      <GithubLogo size={16} />
                      {p.link.label}
                    </ExternalLink>
                  </div>
                )}
              </Panel>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <SectionTitle kicker="ALL">All Projects</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.03}>
                <Panel interactive className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p.icon size={20} className="text-accent" weight="duotone" />
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-ink-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-3 text-[15px] font-semibold text-ink">{p.title}</h3>
                  {p.date && (
                    <p className="mt-0.5 font-mono text-xs text-ink-faint">{p.date}</p>
                  )}
                  <p className="mt-1.5 flex-1 text-sm text-ink-dim">{p.body}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  {p.link && (
                    <div className="mt-4">
                      <ExternalLink
                        href={p.link.href}
                        className="inline-flex items-center gap-1.5 text-sm"
                      >
                        <GithubLogo size={14} />
                        {p.link.label}
                      </ExternalLink>
                    </div>
                  )}
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-16 rounded-[12px] border border-dashed border-border-bright p-8 text-center">
            <h3 className="text-lg font-semibold text-ink">Want to see more?</h3>
            <p className="mx-auto mt-2 max-w-[46ch] text-sm text-ink-dim">
              Check out my GitHub profile for additional projects and contributions
            </p>
            <AnchorButton
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5"
            >
              <GithubLogo size={16} />
              Visit GitHub Profile
            </AnchorButton>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
