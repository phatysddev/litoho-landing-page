import { html } from "lit";
import type { LitoLayoutModule } from "@litoho/app";

const layout: LitoLayoutModule<{ appName: string }> = {
  load: () => ({
    appName: "Litoho"
  }),
  document: {
    links: [{ rel: "icon", href: "/logo.png", type: "image/png" }]
  },
  render: ({ children, data }) => html`
    <div class="min-h-screen bg-transparent">
      <header class="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" class="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white sm:text-sm sm:tracking-[0.28em]">
            <img src="/logo.png" alt="Litoho logo" class="h-8 w-8 object-contain drop-shadow-[0_8px_24px_rgba(248,196,68,0.18)] sm:h-9 sm:w-9" />
            ${data.appName}
          </a>
          <nav class="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            <a class="transition hover:text-white" href="/">Framework</a>
            <a class="transition hover:text-white" href="/docs">Docs</a>
            <a class="transition hover:text-white" href="/docs/getting-started">Getting Started</a>
            <a class="transition hover:text-white" href="/docs/comparison">Comparison</a>
            <a class="transition hover:text-white" href="/docs/security">Security</a>
            <a class="transition hover:text-white" href="/docs/cli">CLI</a>
            <a class="transition hover:text-white" href="/api/health">API</a>
          </nav>
        </div>
        <nav class="no-scrollbar flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-2 text-xs text-slate-300 sm:px-6 lg:hidden">
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/">Framework</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs">Docs</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/getting-started">Getting Started Guide</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/routing">Routing</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/ui">UI</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/security">Security</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/cli">CLI</a>
        </nav>
      </header>
      ${children}
      <footer class="border-t border-white/10 bg-slate-950/55">
        <div class="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
          <div>
            <p class="font-semibold text-white">Litoho is created and maintained by phatysddev.</p>
            <p class="mt-2 max-w-2xl leading-7">
              A Lit-first full-stack framework focused on explicit routing, SSR, app-owned components, UI primitives,
              and production-ready server guardrails.
            </p>
          </div>
          <nav class="flex flex-wrap items-center gap-3 lg:justify-end">
            <a class="rounded-full border border-white/10 px-4 py-2 transition hover:border-amber-300/50 hover:text-white" href="https://github.com/phatysddev/lito">
              GitHub repository
            </a>
            <a class="rounded-full border border-white/10 px-4 py-2 transition hover:border-amber-300/50 hover:text-white" href="https://www.npmjs.com/package/litoho">
              npm package
            </a>
            <a class="rounded-full border border-white/10 px-4 py-2 transition hover:border-amber-300/50 hover:text-white" href="/docs/getting-started">
              Getting Started Guide
            </a>
          </nav>
        </div>
      </footer>
    </div>
  `
};

export default layout;
