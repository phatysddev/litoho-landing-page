import { html } from "lit";

export const docsNavigation = [
  {
    href: "/docs/getting-started",
    title: "Getting Started",
    kicker: "Setup",
    description: "Scaffold a new app, install dependencies, and boot the development server."
  },
  {
    href: "/docs/routing",
    title: "Routing",
    kicker: "Pages",
    description: "Learn how app/pages, app/api, nested layouts, and generated manifests fit together."
  },
  {
    href: "/docs/cli",
    title: "CLI",
    kicker: "Commands",
    description: "Use generators, UI commands, and doctor checks to stay inside framework conventions."
  },
  {
    href: "/docs/ui",
    title: "UI and Components",
    kicker: "Views",
    description: "Combine @litoho/ui primitives with app-local Lit components in src/components."
  },
  {
    href: "/docs/state",
    title: "State",
    kicker: "Core",
    description: "Use signal, memo, watch, batch, store, and LitoElement for reactive client UI."
  },
  {
    href: "/docs/context",
    title: "Context",
    kicker: "Runtime",
    description: "Understand page, layout, API, middleware, request locals, cookies, env, timing, and audit context."
  },
  {
    href: "/docs/seo",
    title: "SEO and SSR",
    kicker: "Visibility",
    description: "Use server rendering, route-level metadata, and clean markup to ship pages that index well."
  },
  {
    href: "/docs/security",
    title: "Security",
    kicker: "Hardening",
    description: "Configure host allowlists, trusted proxies, CSRF, origin checks, rate limits, timeouts, and audit hooks."
  },
  {
    href: "/docs/comparison",
    title: "Comparison",
    kicker: "Positioning",
    description: "See where Litoho is leaner than larger meta-frameworks and where its tradeoffs are intentional."
  },
  {
    href: "/docs/deployment",
    title: "Deployment",
    kicker: "Ship",
    description: "Build the client bundle and run the SSR server in production mode."
  }
] as const;

export function createSeoDocument(title: string, description: string, pathname: string) {
  const canonicalUrl = `https://litoho.dev${pathname}`;

  return {
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: "https://litoho.dev/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description }
    ],
    links: [
      { rel: "canonical", href: canonicalUrl },
      { rel: "icon", href: "/logo.png", type: "image/png" }
    ]
  };
}

export function renderDocsSidebar(pathname: string) {
  return html`
    <nav class="mt-8 grid gap-1">
      ${docsNavigation.map((item) => {
        const active = pathname === item.href;

        return html`
          <a
            class=${[
              "rounded-2xl px-4 py-3 text-sm transition",
              active
                ? "bg-white text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.3)]"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
            ].join(" ")}
            href=${item.href}
          >
            <span class="block font-medium">${item.title}</span>
            <span class=${active ? "mt-1 block text-xs text-slate-700" : "mt-1 block text-xs text-slate-500"}>${item.kicker}</span>
          </a>
        `;
      })}
    </nav>
  `;
}

export function renderDocsMobileNav(pathname: string) {
  return html`
    <nav class="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      ${docsNavigation.map((item) => {
        const active = pathname === item.href;

        return html`
          <a
            class=${[
              "shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition",
              active
                ? "border-white bg-white text-slate-950"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-amber-300/50 hover:text-white"
            ].join(" ")}
            href=${item.href}
          >
            ${item.title}
          </a>
        `;
      })}
    </nav>
  `;
}

export function renderDocHero(title: string, description: string) {
  return html`
    <section class="mb-6 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 sm:mb-8 sm:rounded-[2rem] sm:p-9">
      <p class="text-[0.68rem] uppercase tracking-[0.22em] text-amber-300 sm:text-xs sm:tracking-[0.32em]">Documentation</p>
      <h1 class="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">${title}</h1>
      <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">${description}</p>
    </section>
  `;
}

export function renderCodeBlock(code: string) {
  return html`
    <pre class="mt-5 max-w-full overflow-x-auto rounded-[1rem] border border-white/10 bg-black/40 p-3 text-[0.78rem] leading-6 text-slate-200 sm:rounded-[1.25rem] sm:p-4 sm:text-sm sm:leading-7"><code class="whitespace-pre">${code}</code></pre>
  `;
}

export function renderStepList(
  items: Array<{
    title: string;
    body: string;
    code: string;
  }>
) {
  return html`
    <section class="grid gap-6">
      ${items.map(
        (item, index) => html`
          <article class="rounded-[1.35rem] border border-white/10 bg-slate-950/70 p-5 sm:rounded-[1.5rem] sm:p-6">
            <div class="flex flex-wrap items-center gap-3 sm:gap-4">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-xs font-semibold text-amber-200 sm:h-9 sm:w-9 sm:text-sm">
                ${index + 1}
              </span>
              <h2 class="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">${item.title}</h2>
            </div>
            <p class="mt-4 text-sm leading-7 text-slate-400">${item.body}</p>
            ${renderCodeBlock(item.code)}
          </article>
        `
      )}
    </section>
  `;
}
