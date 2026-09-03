import { DownloadSimple, Printer, MapPin, EnvelopeSimple, Phone, LinkedinLogo } from "@phosphor-icons/react";

import { PageMeta } from "../components/PageMeta";
import { PageHeader } from "../components/PageHeader";
import { AnchorButton, Container, Reveal, buttonClass, linkifyCompanies } from "../components/primitives";
import { site } from "../content/site";
import { resumeName, resumeSections } from "../content/resume";

export default function Resume() {
  return (
    <>
      <PageMeta
        title="Resume"
        description="Travis McCormick's resume: Embedded Cybersecurity Engineer at EveryPeer, with experience in reverse engineering, embedded systems, and network security. Downloadable PDF."
      />
      <PageHeader
        kicker="cat resume.pdf"
        title="Resume"
        actions={
          <div className="no-print flex flex-wrap gap-3">
            <AnchorButton
              href="/assets/Travis_McCormick_Resume(clr).pdf"
              download="Travis_McCormick_Resume_Color.pdf"
            >
              <DownloadSimple size={16} />
              Download Color PDF
            </AnchorButton>
            <AnchorButton
              href="/assets/Travis_McCormick_Resume(blk).pdf"
              download="Travis_McCormick_Resume_BW.pdf"
              variant="secondary"
            >
              <DownloadSimple size={16} />
              Download B&amp;W PDF
            </AnchorButton>
            <button
              type="button"
              onClick={() => window.print()}
              className={buttonClass("secondary")}
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        }
      />

      <Container className="py-14">
        <Reveal>
          <div className="print-plain rounded-[12px] border border-border bg-surface/60 p-6 sm:p-10">
            <header className="border-b border-border pb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">{resumeName}</h2>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-dim">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> {site.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <EnvelopeSimple size={14} /> {site.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone size={14} /> {site.phone}
                </span>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  <LinkedinLogo size={14} /> linkedin.com/in/travissmccormick
                </a>
              </div>
            </header>

            <div className="divide-y divide-border">
              {resumeSections.map((section) => (
                <section key={section.title} className="py-7 first:pt-7 last:pb-0">
                  <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-accent">
                    {section.title}
                  </h3>

                  {section.entries && (
                    <div className="space-y-6">
                      {section.entries.map((entry) => (
                        <div key={`${entry.title}-${entry.company ?? ""}`}>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <div>
                              <h4 className="text-[15px] font-semibold text-ink">{entry.title}</h4>
                              {entry.company && (
                                <p className="text-sm text-ink-dim">{linkifyCompanies(entry.company)}</p>
                              )}
                              {entry.meta && (
                                <p className="text-sm text-ink-dim">{entry.meta}</p>
                              )}
                            </div>
                            {entry.date && (
                              <span className="font-mono text-xs text-ink-faint">{entry.date}</span>
                            )}
                          </div>
                          {entry.bullets && (
                            <ul className="mt-2.5 space-y-1.5">
                              {entry.bullets.map((b, i) => (
                                <li
                                  key={i}
                                  className="relative pl-4 text-sm text-ink-dim before:absolute before:left-0 before:top-2.5 before:size-1 before:rounded-full before:bg-accent"
                                >
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.accomplishments && (
                    <ul className="space-y-2">
                      {section.accomplishments.map((a, i) => (
                        <li key={i} className="text-sm text-ink-dim">
                          <span className="font-medium text-ink">{a.text}</span> | {a.org}{" "}
                          <span className="font-mono text-xs text-ink-faint">({a.date})</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.groups && (
                    <div className="space-y-4">
                      {section.groups.map((g) => (
                        <div key={g.label}>
                          <h5 className="text-sm font-semibold text-ink">{g.label}</h5>
                          <p className="mt-1 text-sm text-ink-dim">{g.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
