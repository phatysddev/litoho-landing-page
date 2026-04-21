import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const page: LitoPageModule = {
  document: createSeoDocument(
    "Why Litoho",
    "See where Litoho is intentionally leaner than larger frameworks and why its Lit-first design can be a better fit for some teams.",
    "/docs/comparison"
  ),
  render: () => html`
    ${renderDocHero(
      "Framework Comparison",
      "Litoho is intentionally opinionated. It aims to make Lit-first full-stack work coherent, not to cover every framework use case."
    )}

    <section class="grid gap-6 lg:grid-cols-3">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <p class="text-xs uppercase tracking-[0.3em] text-amber-300">Compared with larger React meta-frameworks</p>
        <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">Less conceptual surface area</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho gives you routing, SSR, and CLI scaffolding without the broader stack of React-specific runtime
          concepts. That tradeoff can make teams faster when they already prefer Lit.
        </p>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <p class="text-xs uppercase tracking-[0.3em] text-amber-300">Compared with fully manual Lit setups</p>
        <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">More framework leverage</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          You still own plain project files, but you do not have to keep rebuilding route manifests, server glue, or
          scaffolding conventions by hand.
        </p>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <p class="text-xs uppercase tracking-[0.3em] text-amber-300">Compared with generic full-stack starters</p>
        <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">More coherent Lit story</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho is opinionated about how Lit fits into full-stack work. The route model, local components, and SSR
          pipeline all point in the same direction.
        </p>
      </article>
    </section>

    <section class="mt-8 grid gap-6 lg:grid-cols-2">
      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">When Litoho is a strong fit</h2>
        ${renderCodeBlock(`- Team already prefers Lit templates
- Need SSR + API routes with minimal framework overhead
- Want route/file ownership to stay explicit
- Prefer generator-based conventions over custom glue`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">When to choose another stack</h2>
        ${renderCodeBlock(`- Heavy dependence on React-only ecosystems
- Need enterprise plugins tightly coupled to React meta-frameworks
- Team workflow assumes framework-specific React abstractions`)}
      </article>
    </section>

    <section class="mt-8 rounded-3xl border border-white/10 bg-white/3 p-6">
      <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Important tradeoff</h2>
      <p class="mt-3 text-sm leading-7 text-slate-400">
        If you want the biggest ecosystem of turnkey React packages and patterns, larger React frameworks will still have
        the advantage. Litoho is strongest when the team wants Lit, smaller abstractions, and explicit ownership of the
        app structure.
      </p>
    </section>
  `
};

export default page;
