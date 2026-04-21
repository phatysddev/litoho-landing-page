import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho UI and Components",
    "Build with @litoho/ui primitives and app-local Lit components in src/components for clear ownership and fast composition.",
    "/docs/ui"
  ),
  render: () => html`
    ${renderDocHero(
      "UI and Components",
      "Use @litoho/ui for stable primitives and local Lit components for product-specific UI that your team owns directly."
    )}

    <section class="grid gap-6 lg:grid-cols-2">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">@litoho/ui</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Pull in selective primitives when you want a shared system with minimal bundle overhead.
        </p>
        ${renderCodeBlock(`import "@litoho/ui/button";\nimport "@litoho/ui/card";`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">App-local components</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Keep business UI in your repo and scaffold it under <code>src/components</code>.
        </p>
        ${renderCodeBlock(`litoho g c marketing/hero\nlitoho g c docs/code-frame --with-ui card\nlitoho g c profile/summary --page docs`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6 lg:col-span-2">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Ownership model that scales</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Treat shared primitives as a base layer and build feature components close to the routes that use them. This
          keeps cross-team edits small and reduces accidental global coupling.
        </p>
        ${renderCodeBlock(`src/components/
  docs/
    code-frame.ts
  marketing/
    hero.ts
  profile/
    summary.ts`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Composition pattern</h2>
        ${renderCodeBlock(`import { html } from "lit";
import "@litoho/ui/card";
import "@litoho/ui/button";

export const renderEmptyState = () => html\`
  <ui-card>
    <h3>No items yet</h3>
    <p>Create your first item to continue.</p>
    <ui-button>Create</ui-button>
  </ui-card>
\`;`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Styling workflow</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Keep utility-first layout classes in route templates and move repeating visual blocks into reusable
          components when duplication appears.
        </p>
        ${renderCodeBlock(`1) Build screen layout in app/pages/*
2) Extract repeated blocks to src/components/*
3) Keep shared atoms in @litoho/ui`)}
      </article>
    </section>
  `
};

export default page;
