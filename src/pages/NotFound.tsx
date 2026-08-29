import { PageMeta } from "../components/PageMeta";
import { Container, LinkButton } from "../components/primitives";

export default function NotFound() {
  return (
    <>
      <PageMeta title="404" description="Page not found." />
      <Container className="flex flex-col items-start gap-6 py-32">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          No route matched
        </h1>
        <p className="max-w-[46ch] text-[15px] text-ink-dim">
          That path doesn't exist. Head back to the home page.
        </p>
        <LinkButton to="/">Go Home</LinkButton>
      </Container>
    </>
  );
}
