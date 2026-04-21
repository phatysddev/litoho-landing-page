import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho SEO and SSR",
    "Use Litoho route metadata, SSR output, canonical tags, and Open Graph fields to ship SEO-friendly pages with Lit.",
    "/docs/seo"
  ),
  render: () => html`
    ${renderDocHero(
      "SEO and SSR",
      "SEO in Litoho is route-native: metadata, canonical links, and SSR content are authored next to the page itself."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Route-level metadata</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Each page can return titles, meta tags, link tags, and styles from the same route module that renders the
          content. That keeps content and metadata close together.
        </p>
        ${renderCodeBlock(`const page: LitoPageModule = {\n  document: {\n    title: "Litoho SEO Guide",\n    meta: [\n      { name: "description", content: "Ship crawlable Lit pages with SSR." },\n      { property: "og:title", content: "Litoho SEO Guide" }\n    ],\n    links: [{ rel: "canonical", href: "https://litoho.dev/docs/seo" }]\n  },\n  render: () => html\`...\`\n};`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Canonical strategy</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Always map each page to one canonical URL. This avoids duplicate indexing when the same content can be
          reached through multiple query variants.
        </p>
        ${renderCodeBlock(`const canonicalUrl = "https://litoho.dev/docs/seo";

document: {
  title: "Litoho SEO Guide",
  links: [{ rel: "canonical", href: canonicalUrl }],
  meta: [
    { property: "og:url", content: canonicalUrl },
    { name: "twitter:card", content: "summary_large_image" }
  ]
}`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">SSR by default helps discoverability</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Search engines and link unfurlers see real HTML with your route copy and metadata already present. You do not
          need to depend on client hydration just to expose the primary meaning of the page.
        </p>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Content and heading quality</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Keep one strong H1 per page, use semantic section headings, and ensure your primary answer appears early in
          SSR output. Crawlers and users benefit from the same clarity.
        </p>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Validation checklist</h2>
        ${renderCodeBlock(`1) View page source and confirm title + meta + canonical
2) Check og:title / og:description / og:url
3) Test social preview cards
4) Confirm main content is visible without client execution`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Why this is a selling point for Litoho</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho pairs Lit’s small rendering model with a server path that is simple enough to reason about. The result
          is a framework where SEO does not require a second mental model on top of the app itself.
        </p>
      </article>
    </section>
  `
};

export default page;
