import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

/** Join class names, dropping falsy values. */
export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Buttons - one shape system: pill, two variants                    */
/* ------------------------------------------------------------------ */
type ButtonVariant = "primary" | "secondary";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:translate-y-px";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-[#06090d] hover:bg-accent-bright",
  secondary:
    "border border-border-bright text-ink hover:border-accent hover:text-accent bg-transparent",
};

export function buttonClass(variant: ButtonVariant = "primary", extra?: string) {
  return cx(BUTTON_BASE, BUTTON_VARIANTS[variant], extra);
}

/** Internal route button. */
export function LinkButton({
  to,
  variant = "primary",
  children,
  className,
}: {
  to: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

/** External / download anchor button. */
export function AnchorButton({
  variant = "primary",
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  return (
    <a className={buttonClass(variant, className)} {...rest}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal - fade + rise on mount. Honors reduced motion.             */
/*  Mount-triggered (not scroll-triggered) on purpose: scroll-gated   */
/*  reveals can stay invisible above the fold until the first scroll  */
/*  event nudges the IntersectionObserver. This is always reliable.   */
/* ------------------------------------------------------------------ */
const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
} as const;

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof MOTION_TAGS;
}) {
  const reduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  Layout shell                                                      */
/* ------------------------------------------------------------------ */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/*  Panel - the one card treatment used everywhere                    */
/* ------------------------------------------------------------------ */
export function Panel({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cx(
        "rounded-[12px] border border-border bg-gradient-to-b from-surface-2/60 to-surface/60",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        interactive &&
          "transition-all duration-200 hover:border-border-bright hover:from-surface-2/90 hover:to-surface-2/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(76,141,255,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading with a mono kicker                                */
/* ------------------------------------------------------------------ */
export function SectionTitle({
  children,
  kicker,
  id,
}: {
  children: ReactNode;
  kicker?: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-8 scroll-mt-28">
      {kicker && (
        <div className="mb-2 font-mono text-xs tracking-widest text-accent">{kicker}</div>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{children}</h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge / tech pill                                                 */
/* ------------------------------------------------------------------ */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink-dim">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Links                                                             */
/* ------------------------------------------------------------------ */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "text-accent underline-offset-4 transition-colors hover:text-accent-bright hover:underline",
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Company mentions - always linked, with a fixed color per company  */
/* ------------------------------------------------------------------ */
const GREEN_LINK = "text-online underline-offset-4 transition-colors hover:underline";
const BLUE_LINK =
  "text-accent underline-offset-4 transition-colors hover:text-accent-bright hover:underline";

const COMPANY_LINKS: { label: string; href: string; className: string }[] = [
  { label: "EveryPeer", href: "https://everypeer.net/", className: GREEN_LINK },
  // Longer form first so "ICR, Inc." wins over the bare "ICR" alternative.
  { label: "ICR, Inc.", href: "https://www.icr-team.com/", className: BLUE_LINK },
  { label: "ICR", href: "https://www.icr-team.com/", className: BLUE_LINK },
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const COMPANY_RE = new RegExp(`(${COMPANY_LINKS.map((c) => escapeRe(c.label)).join("|")})`, "g");

/** Render a string, turning every known company name into an external link. */
export function linkifyCompanies(text: string): ReactNode {
  if (!COMPANY_LINKS.some((c) => text.includes(c.label))) return text;
  return text.split(COMPANY_RE).map((part, i) => {
    const match = COMPANY_LINKS.find((c) => c.label === part);
    return match ? (
      <a
        key={i}
        href={match.href}
        target="_blank"
        rel="noopener noreferrer"
        className={match.className}
      >
        {part}
      </a>
    ) : (
      part
    );
  });
}

/* ------------------------------------------------------------------ */
/*  Prose block - consistent paragraph rhythm and measure            */
/* ------------------------------------------------------------------ */
export function Prose({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <div className={cx("space-y-4 text-[15px] leading-relaxed text-ink-dim", className)}>
      {paragraphs.map((p, i) => (
        <p key={i} className="max-w-[68ch]">
          {linkifyCompanies(p)}
        </p>
      ))}
    </div>
  );
}
