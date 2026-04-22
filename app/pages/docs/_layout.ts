import { html } from "lit";
import type { LitoLayoutModule } from "@litoho/app";
import { createSeoDocument, renderDocsMobileNav, renderDocsSidebar } from "../../../src/docs";

const layout: LitoLayoutModule = {
  document: () =>
    createSeoDocument(
      "Litoho Documentation",
      "Documentation for Litoho: getting started, routing, CLI, components, SEO, deployment, and framework comparison.",
      "/docs"
    ),
  render: ({ children, pathname }) => html`
    <main class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div class="mb-6 rounded-[1.35rem] border border-white/10 bg-slate-950/70 p-4 lg:hidden">
        <div class="mb-4 flex items-center justify-between gap-4">
          <div>
            <p class="text-[0.68rem] uppercase tracking-[0.24em] text-amber-300">Litoho Docs</p>
            <h2 class="mt-1 text-base font-semibold text-white">Choose a guide</h2>
          </div>
          <a class="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300" href="/docs">
            Index
          </a>
        </div>
        ${renderDocsMobileNav(pathname)}
      </div>

      <div class="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)]">
        <aside class="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
            <p class="text-xs uppercase tracking-[0.3em] text-amber-300">Litoho Docs</p>
            <h2 class="mt-3 text-lg font-semibold text-white">Documentation</h2>
            <p class="mt-2 text-sm leading-7 text-slate-400">
              Learn the core loop, routing model, CLI commands, SEO, comparison, and UI workflow.
            </p>
            ${renderDocsSidebar(pathname)}
          </div>
        </aside>

        <section class="min-w-0">${children}</section>
      </div>
    </main>
  `
};

export default layout;
