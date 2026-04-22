import { html } from "lit";
import type { LitoLayoutModule } from "@litoho/app";
import { createSeoDocument } from "../../src/docs";

const layout: LitoLayoutModule<{ appName: string }> = {
  load: () => ({
    appName: "Litoho"
  }),
  document: () =>
    createSeoDocument(
      "Litoho, the Lit-first full-stack framework",
      "Litoho is a Lit-first full-stack framework with file-based routing, SSR, app-local components, and a CLI that keeps the stack intentionally small.",
      "/"
    ),
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
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/getting-started">Start</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/routing">Routing</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/ui">UI</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/security">Security</a>
          <a class="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-amber-300/50 hover:text-white" href="/docs/cli">CLI</a>
        </nav>
      </header>
      ${children}
    </div>
  `
};

export default layout;
