import { useEffect } from "react";
import { site } from "../content/site";

type Props = { title: string; description: string };

// Per-route <title> and meta/OG tags, so shared links are page-specific.
export function PageMeta({ title, description }: Props) {
  useEffect(() => {
    const fullTitle =
      title === site.name ? `${site.name} | ${site.role}` : `${title} | ${site.name}`;
    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
  }, [title, description]);

  return null;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}
