import { html } from "lit";
import type { LitoLayoutModule } from "@litoho/app";
import { createSeoDocument, docsNavigation, renderDocsSidebar } from "../../../src/docs";

const layout: LitoLayoutModule = {
  document: () =>
    createSeoDocument(
      "Litoho Documentation",
      "Documentation for Litoho: getting started, routing, CLI, components, SEO, deployment, and framework comparison.",
      "/docs"
    ),
  render: ({ children, pathname }) => html`
    <main class="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8">
      <div class="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)_14rem]">
        <aside class="lg:sticky lg:top-24 lg:self-start">
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

        <aside class="hidden xl:block xl:sticky xl:top-24 xl:self-start">
          <div class="rounded-3xl border border-white/10 bg-white/3 p-5">
            <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Sections</p>
            <div class="mt-4 grid gap-3">
              ${docsNavigation.map(
                (item) => html`
                  <a class="text-sm leading-6 text-slate-400 transition hover:text-white" href=${item.href}>${item.title}</a>
                `
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  `
};

export default layout;
