import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  User,
  Code,
  FileText,
  BookOpen,
  PersonSimpleSwim,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

import { PageMeta } from "../components/PageMeta";
import { BootIntro, shouldPlayBoot } from "../components/BootIntro";
import {
  Container,
  LinkButton,
  Panel,
  Reveal,
  SectionTitle,
  SocialLinks,
  linkifyCompanies,
} from "../components/primitives";
import { site } from "../content/site";
import { now } from "../content/now";

type Card = { to: string; icon: Icon; title: string; body: string };

const CARDS: Card[] = [
  { to: "/about", icon: User, title: "About", body: "Learn about my background, education, and what I'm working on." },
  { to: "/resume", icon: FileText, title: "Resume", body: "My full professional experience and downloadable resume." },
  { to: "/contact", icon: EnvelopeSimple, title: "Contact", body: "Get in touch. I'm always open to new opportunities." },
  { to: "/projects", icon: Code, title: "Projects", body: "Check out the things I've built, from keyboards to web apps." },
  { to: "/books", icon: BookOpen, title: "Books", body: "What I'm reading now and the books that have stuck with me." },
  { to: "/swimming", icon: PersonSimpleSwim, title: "Swimming", body: "My competitive swimming background and lifeguarding journey." },
];

export default function Home() {
  const [booting, setBooting] = useState(shouldPlayBoot);

  return (
    <>
      <PageMeta
        title={site.name}
        description={`${site.name} is an ${site.role} at ${site.company}. Embedded agents, WebRTC peer discovery, network security, and the things I build to fix problems I run into.`}
      />
      {booting && <BootIntro onDone={() => setBooting(false)} />}

      <Hero />
      <NowStrip />
      <ExploreCards />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[420px] w-[520px] rounded-full bg-accent/10 blur-[120px]"
      />
      <Container className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="font-mono text-sm text-accent">{site.role}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            {site.name}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton to="/contact">Get In Touch</LinkButton>
            <LinkButton to="/resume" variant="secondary">
              View Resume
            </LinkButton>
          </div>

          <SocialLinks size="md" className="mt-7" />
        </Reveal>

        <Reveal delay={0.1} className="justify-self-center md:justify-self-end">
          <figure className="relative w-[240px] sm:w-[300px]">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="rounded-[14px] border border-border-bright bg-surface/40 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_-20px_rgba(76,141,255,0.35)]">
              <img
                src="/assets/headshot.jpg"
                alt={site.name}
                width={300}
                height={300}
                className="no-copy aspect-square w-full rounded-[10px] object-cover"
                draggable={false}
              />
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

function NowStrip() {
  return (
    <section className="border-b border-border bg-surface/40 py-10">
      <Container>
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-online opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-online" />
            </span>
            <span className="font-mono text-xs tracking-widest text-ink-dim">
              NOW · {now.status}
            </span>
          </div>

          <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-3">
            {now.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  {item.label}
                </dt>
                <dd className="text-sm text-ink">{linkifyCompanies(item.value)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

function ExploreCards() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionTitle kicker="INDEX">Around the site</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.to} delay={i * 0.04}>
              <Link to={card.to} className="group block h-full">
                <Panel interactive className="flex h-full flex-col p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <card.icon size={22} className="text-accent" weight="duotone" />
                    <ArrowUpRight
                      size={16}
                      className="text-ink-faint transition-colors group-hover:text-accent"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-dim">{card.body}</p>
                </Panel>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
