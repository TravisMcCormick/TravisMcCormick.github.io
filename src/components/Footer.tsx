import { site } from "../content/site";
import { Container, SocialLinks } from "./primitives";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-10 text-sm text-ink-dim">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-ink-faint">
          &copy; {year} {site.name}. All rights reserved.
        </p>
        <SocialLinks email />
      </Container>
    </footer>
  );
}
