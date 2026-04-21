import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, docsNavigation, renderDocHero } from "../../../src/docs";

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Docs Overview",
    "Read the Litoho documentation: setup, routing, CLI, UI workflow, SEO, deployment, and framework comparison.",
    "/docs"
  ),
  render: () => html`
    ${renderDocHero(
      "Documentation Overview",
      "A complete map of the Litoho stack: onboarding, routing, CLI workflow, UI architecture, SEO strategy, and deployment."
    )}

    <section class="mb-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-300">Recommended Reading Path</p>
        <ol class="mt-4 grid gap-2 text-sm leading-7 text-slate-300">
          <li>1. Getting Started: scaffold and run the app.</li>
          <li>2. Routing: understand pages, layouts, and API mapping.</li>
          <li>3. CLI: standardize generation and verification commands.</li>
          <li>4. UI and Components: separate shared primitives from app-owned UI.</li>
          <li>5. SEO and SSR: route-level metadata and canonical strategy.</li>
          <li>6. Security: harden server boundaries and mutation routes.</li>
          <li>7. Deployment: build and run in production mode.</li>
        </ol>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Quickstart Commands</p>
        <pre class="mt-4 overflow-x-auto rounded-[1rem] border border-white/10 bg-black/40 p-4 text-sm leading-7 text-slate-200"><code>npm install
npm run dev
litoho doctor
npm run build
npm start</code></pre>
      </article>
    </section>

    <section class="grid gap-4 lg:grid-cols-2">
      ${docsNavigation.map(
        (item) => html`
          <a
            class="rounded-3xl border border-white/10 bg-slate-950/70 p-6 transition duration-200 hover:-translate-y-1 hover:border-amber-300/30"
            href=${item.href}
          >
            <p class="text-xs uppercase tracking-[0.28em] text-slate-500">${item.kicker}</p>
            <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">${item.title}</h2>
            <p class="mt-3 text-sm leading-7 text-slate-400">${item.description}</p>
          </a>
        `
      )}
    </section>
  `
};

export default page;
