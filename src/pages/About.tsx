import {
  UserCircle,
  GraduationCap,
  Certificate,
  Briefcase,
  Heart,
  BookOpen,
} from "@phosphor-icons/react";

import { PageMeta } from "../components/PageMeta";
import { PageHeader } from "../components/PageHeader";
import {
  Container,
  Panel,
  Prose,
  Reveal,
  SectionTitle,
  cx,
  linkifyCompanies,
} from "../components/primitives";
import {
  certInProgress,
  certs,
  education,
  experience,
  interests,
  myStory,
} from "../content/about";

const TOC = [
  { id: "my-story", label: "My Story", icon: UserCircle },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", icon: Certificate },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "interests", label: "Interests", icon: Heart },
];

export default function About() {
  return (
    <>
      <PageMeta
        title="About"
        description="Travis McCormick's background: how he got into cybersecurity, his education, certifications, work experience, and interests outside of tech."
      />
      <PageHeader kicker="WHOAMI" title="About Me" />

      <Container className="grid gap-12 py-14 lg:grid-cols-[200px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              Contents
            </p>
            {TOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-dim transition-colors hover:bg-surface hover:text-ink"
              >
                <item.icon size={15} />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 space-y-16">
          <section>
            <SectionTitle id="my-story" kicker="01">
              My Story
            </SectionTitle>
            <Reveal>
              <Prose paragraphs={myStory} />
            </Reveal>
          </section>

          <section>
            <SectionTitle id="education" kicker="02">
              Education
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {education.map((e, i) => (
                <Reveal key={e.degree} delay={i * 0.05}>
                  <Panel className="h-full p-5">
                    <h3 className="text-[15px] font-semibold text-ink">{e.degree}</h3>
                    <p className="mt-1 text-sm text-ink-dim">{e.institution}</p>
                    <p className="mt-2 font-mono text-xs text-ink-faint">{e.date}</p>
                    <p className="mt-2 text-sm text-ink-dim">{e.focus}</p>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle id="certifications" kicker="03">
              Certifications
            </SectionTitle>
            <div className="space-y-4">
              <Reveal>
                <Panel className="border-l-2 border-l-accent p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <BookOpen size={16} className="text-accent" />
                    <h3 className="text-[15px] font-semibold text-ink">{certInProgress.name}</h3>
                    <span className="rounded-md border border-accent/40 px-2 py-0.5 font-mono text-[11px] text-accent">
                      In Progress
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-dim">{certInProgress.org}</p>
                  <p className="mt-1 font-mono text-xs text-ink-faint">{certInProgress.date}</p>
                  <p className="mt-2 text-sm text-ink-dim">{certInProgress.desc}</p>
                </Panel>
              </Reveal>

              {certs.map((c, i) => (
                <Reveal key={c.name} delay={(i + 1) * 0.05}>
                  <Panel className="p-5">
                    <div className="flex items-center gap-2">
                      <Certificate size={16} className="text-accent" />
                      <h3 className="text-[15px] font-semibold text-ink">{c.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-ink-dim">{c.org}</p>
                    <p className="mt-1 font-mono text-xs text-ink-faint">{c.date}</p>
                    <p className="mt-2 text-sm text-ink-dim">{c.desc}</p>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle id="experience" kicker="04">
              Experience
            </SectionTitle>
            <ol className="relative space-y-6 border-l border-border pl-6">
              {experience.map((x, i) => (
                <Reveal as="li" key={`${x.role}-${x.company}`} delay={i * 0.04}>
                  <span
                    className={cx(
                      "absolute -left-[5px] mt-1.5 size-2.5 rounded-full border-2 border-bg",
                      x.current ? "bg-accent" : "bg-border-bright",
                    )}
                  />
                  <h3 className="text-[15px] font-semibold text-ink">{x.role}</h3>
                  <p className="mt-0.5 text-sm text-ink-dim">{linkifyCompanies(x.company)}</p>
                  <p className="mt-1 font-mono text-xs text-ink-faint">{x.date}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          <section>
            <SectionTitle id="interests" kicker="05">
              Interests
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {interests.map((it, i) => (
                <Reveal key={it.title} delay={i * 0.04}>
                  <Panel className="h-full p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg" aria-hidden>
                        {it.emoji}
                      </span>
                      <h3 className="text-[15px] font-semibold text-ink">{it.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-ink-dim">{it.body}</p>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
