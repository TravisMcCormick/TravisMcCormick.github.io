import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navItems, numberAliases } from "../content/site";

/**
 * Global keyboard shortcuts, carried over from the original site:
 *   letter keys  -> jump to a page (h/a/p/r/u/s/c)
 *   number keys  -> same pages, 1..7
 *   g / b        -> scroll to top / bottom
 * Ignored while typing in an input, textarea, or contenteditable element.
 */
export function useKeyboardNav() {
  const navigate = useNavigate();

  useEffect(() => {
    const letterToPath = new Map(navItems.map((item) => [item.key, item.to]));

    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (letterToPath.has(key)) {
        event.preventDefault();
        navigate(letterToPath.get(key)!);
        return;
      }
      if (numberAliases[key]) {
        event.preventDefault();
        navigate(numberAliases[key]);
        return;
      }
      if (key === "g") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (key === "b") {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);
}
