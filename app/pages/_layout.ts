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
        <div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
          <a href="/" class="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-white">
            <img src="/logo.png" alt="Litoho logo" class="h-9 w-9 object-contain drop-shadow-[0_8px_24px_rgba(248,196,68,0.18)]" />
            ${data.appName}
          </a>
          <nav class="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a class="transition hover:text-white" href="/">Framework</a>
            <a class="transition hover:text-white" href="/docs">Docs</a>
            <a class="transition hover:text-white" href="/docs/getting-started">Getting Started</a>
            <a class="transition hover:text-white" href="/docs/comparison">Comparison</a>
            <a class="transition hover:text-white" href="/docs/security">Security</a>
            <a class="transition hover:text-white" href="/docs/cli">CLI</a>
            <a class="transition hover:text-white" href="/api/health">API</a>
          </nav>
        </div>
      </header>
      ${children}
    </div>
  `
};

export default layout;
