import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { navItems } from "../content/site";
import { Container, cx } from "./primitives";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on every route change.
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 font-mono text-sm text-ink"
          aria-label="Home"
        >
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md border border-border-bright bg-surface-2 text-accent"
          >
            <span className="translate-y-[-1px] text-[13px] font-bold">&#8250;</span>
          </span>
          <span className="hidden sm:inline">
            travis<span className="text-ink-faint">mccormick</span>
          </span>
          <span className="sm:hidden">tsm</span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cx(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-surface-2 text-ink"
                    : "text-ink-dim hover:bg-surface hover:text-ink",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-md border border-border text-ink-dim transition-colors hover:text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </Container>

      {open && (
        <nav className="border-t border-border bg-bg lg:hidden">
          <Container className="flex flex-col py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cx(
                    "flex items-center gap-3 rounded-md px-3 py-3 text-[15px] transition-colors",
                    isActive ? "bg-surface-2 text-ink" : "text-ink-dim hover:text-ink",
                  )
                }
              >
                <item.icon size={18} weight="duotone" className="text-accent" />
                {item.label}
              </NavLink>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
