import { useEffect, useState } from "react";
import type { Icon } from "@phosphor-icons/react";

import { cx } from "./primitives";

export type SectionNavItem = { id: string; label: string; icon?: Icon };

// Sticky side nav that highlights the section currently in view. Clicking an
// entry jumps to it (smooth-scrolled by the global CSS rule in index.css).
export function SectionNav({
  items,
  title = "Contents",
  className,
}: {
  items: SectionNavItem[];
  title?: string;
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  // Joined so the effect only re-subscribes when the id set changes.
  const ids = items.map((i) => i.id).join("|");

  useEffect(() => {
    const sectionIds = ids ? ids.split("|") : [];
    if (sectionIds.length === 0) return;

    // How far below the viewport top a heading must be to count as "current".
    const OFFSET = 140;

    const onScroll = () => {
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      if (atBottom) {
        setActive(sectionIds[sectionIds.length - 1]);
        return;
      }
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - OFFSET <= 0) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  if (items.length === 0) return null;

  return (
    <aside className={cx("hidden lg:block", className)}>
      <nav className="sticky top-24 space-y-1" aria-label={title}>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          {title}
        </p>
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={() => setActive(item.id)}
              className={cx(
                "flex items-center gap-2 rounded-md border-l-2 px-2 py-1.5 text-sm transition-colors",
                isActive
                  ? "border-l-accent bg-surface text-ink"
                  : "border-l-transparent text-ink-dim hover:bg-surface hover:text-ink",
              )}
            >
              {item.icon && (
                <item.icon
                  size={15}
                  weight={isActive ? "fill" : "regular"}
                  className={isActive ? "text-accent" : undefined}
                />
              )}
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
