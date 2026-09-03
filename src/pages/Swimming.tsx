import { Link } from "react-router-dom";
import { ArrowSquareOut } from "@phosphor-icons/react";

import { PageMeta } from "../components/PageMeta";
import { PageHeader } from "../components/PageHeader";
import {
  Container,
  ExternalLink,
  Panel,
  Prose,
  Reveal,
  SectionTitle,
} from "../components/primitives";
import { site } from "../content/site";
import {
  beyondThePool,
  howItStarted,
  swimTimes,
  timesIntro,
  timesNote,
} from "../content/swimming";

export default function Swimming() {
  return (
    <>
      <PageMeta
        title="Swimming"
        description="Travis McCormick's competitive swimming background (2016-2021), personal best times, and how the sport led into lifeguarding, teaching, and engineering."
      />
      <PageHeader
        kicker="~/swimming"
        title="Swimming"
        intro="From competitive swimming to lifeguarding and teaching"
      />

      <Container className="py-14">
        <section>
          <SectionTitle kicker="ORIGIN">How It Started</SectionTitle>
          <Reveal>
            <Prose paragraphs={howItStarted} />
          </Reveal>
        </section>

        <section className="mt-16">
          <SectionTitle kicker="RECORDS">Personal Best Times</SectionTitle>
          <p className="text-sm text-ink-dim">{timesIntro}</p>
          <p className="mt-2 max-w-[70ch] text-sm text-ink-faint">
            <span className="font-medium text-ink-dim">Note:</span> {timesNote}
          </p>

          <Reveal>
            <Panel className="mt-6 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                      <th className="px-4 py-3 font-medium">Event</th>
                      <th className="px-4 py-3 font-medium">Time</th>
                      <th className="px-4 py-3 font-medium">Meet</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {swimTimes.map((row) => (
                      <tr key={`${row.event}-${row.date}`} className="hover:bg-surface-2/50">
                        <td className="px-4 py-2.5 font-medium text-ink">{row.event}</td>
                        <td className="px-4 py-2.5 font-mono text-accent">{row.time}</td>
                        <td className="px-4 py-2.5 text-ink-dim">{row.meet}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-ink-faint">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </Reveal>

          <p className="mt-5 text-sm text-ink-dim">
            View my complete swimming profile on{" "}
            <ExternalLink href={site.swimcloud} className="inline-flex items-center gap-1">
              SwimCloud <ArrowSquareOut size={13} />
            </ExternalLink>
          </p>
        </section>

        <section className="mt-16">
          <SectionTitle kicker="AFTER">Beyond the Pool</SectionTitle>
          <Reveal>
            <p className="max-w-[70ch] text-[15px] leading-relaxed text-ink-dim">
              {beyondThePool.before}
              <Link
                to={beyondThePool.linkTo}
                className="text-accent underline-offset-4 hover:underline"
              >
                {beyondThePool.linkText}
              </Link>
              {beyondThePool.after}
            </p>
          </Reveal>
        </section>
      </Container>
    </>
  );
}
