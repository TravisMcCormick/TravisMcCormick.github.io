import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "./primitives";

const SESSION_KEY = "tsm.boot.seen";
const OK = "[ ok ]";

const LINES = [
  "travis@portfolio:~$ ./init",
  "[ ok ]  loading profile",
  "[ ok ]  mounting projects",
  "[ ok ]  key bindings ready  (press h a p r u s c)",
  "[ ok ]  welcome",
];

// One-per-session terminal boot animation over the home hero. Skippable with
// any key/click, and skipped entirely under prefers-reduced-motion.
export function BootIntro({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [closing, setClosing] = useState(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    if (closing) return;
    setClosing(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode */
    }
    window.setTimeout(onDone, 320);
  }, [closing, onDone]);

  useEffect(() => {
    LINES.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setVisibleLines(i + 1), 260 * (i + 1)));
    });
    timers.current.push(window.setTimeout(finish, 260 * LINES.length + 650));
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [finish]);

  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [finish]);

  return (
    <div
      className={cx(
        "fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-300",
        closing ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      role="presentation"
    >
      <div className="w-full max-w-md px-6 font-mono text-[13px] leading-7">
        {LINES.slice(0, visibleLines).map((line, i) => {
          const ok = line.startsWith(OK);
          return (
            <div key={i} className={ok ? "text-ink-dim" : "text-ink"}>
              {ok ? (
                <>
                  <span className="text-online">{OK}</span>
                  {line.slice(OK.length)}
                </>
              ) : (
                line
              )}
            </div>
          );
        })}
        <span className="inline-block h-4 w-2 translate-y-[3px] animate-pulse bg-accent" />
        <p className="mt-6 text-[11px] text-ink-faint">press any key to skip</p>
      </div>
    </div>
  );
}

export function shouldPlayBoot(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return false;
  }
}
