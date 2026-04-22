import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const comparisonRows = [
  ["Primary UI model", "Lit + Web Components", "React", "Vue", "Svelte", "Multiple islands"],
  ["Routing style", "Strict folder pages with _index.ts", "File/app router", "File router", "File router", "Content/island routes"],
  ["SSR", "Default server-rendered pages", "Deep SSR/RSC model", "SSR + Nitro", "SSR-first kit", "SSR/static islands"],
  ["API routes", "app/api in same server", "Route handlers/API routes", "Server routes", "Server routes", "Endpoints/actions vary by integration"],
  ["Client mode", "\"use client\" route directive", "Client components", "Client hydration", "Client components", "Hydrated islands"],
  ["UI ownership", "@litoho/ui + src/components", "React component ecosystem", "Vue ecosystem", "Svelte ecosystem", "Framework-specific islands"],
  ["Security helpers", "Built-in server middleware set", "App/platform dependent", "App/platform dependent", "App/platform dependent", "App/platform dependent"],
  ["Maturity", "Young experimental framework", "Large production ecosystem", "Large production ecosystem", "Large production ecosystem", "Large production ecosystem"]
] as const;

const choices = [
  {
    name: "Choose Litoho",
    tone: "border-amber-300/25 bg-amber-300/[0.06]",
    points: [
      "You want Lit and Web Components as the primary UI model.",
      "You want SSR, API routes, static assets, and middleware in one small Node server.",
      "You prefer explicit file ownership over a large runtime mental model.",
      "You want CLI conventions for pages, APIs, layouts, middleware, UI, and local components."
    ]
  },
  {
    name: "Choose Next.js",
    tone: "border-white/10 bg-slate-950/70",
    points: [
      "Your team is all-in on React and React Server Components.",
      "You need the largest React-oriented ecosystem and deployment playbooks.",
      "You depend on mature enterprise integrations, templates, plugins, and community examples.",
      "You are comfortable with React-specific abstractions as the core app model."
    ]
  },
  {
    name: "Choose Nuxt",
    tone: "border-white/10 bg-slate-950/70",
    points: [
      "Your team prefers Vue and its module ecosystem.",
      "You want Vue-first conventions, Nitro server tooling, and mature Vue app patterns.",
      "You are building content, dashboards, or commerce apps with a Vue-native team.",
      "You value batteries-included framework features more than a narrow Lit-first runtime."
    ]
  },
  {
    name: "Choose SvelteKit",
    tone: "border-white/10 bg-slate-950/70",
    points: [
      "Your team wants Svelte’s compiler-driven component model.",
      "You want a mature full-stack routing and load/action system around Svelte.",
      "You prefer Svelte syntax and reactivity over Web Components as public primitives.",
      "You want broader SvelteKit docs and examples than a young framework can provide."
    ]
  },
  {
    name: "Choose Astro",
    tone: "border-white/10 bg-slate-950/70",
    points: [
      "Your main workload is content-heavy sites, marketing pages, or docs.",
      "You want islands with multiple UI frameworks in one project.",
      "You need strong static generation and content collection workflows.",
      "You do not need Litoho’s single full-stack Lit app model."
    ]
  }
] as const;

const litohoStrengths = [
  ["Lit-first SSR", "The page contract, route scanner, client boot, and UI primitives all assume Lit instead of adapting Lit into another framework’s worldview."],
  ["Strict route convention", "Only _index.ts creates a URL. Invalid app/pages files fail early, which keeps layouts, params, and manifests predictable."],
  ["One server path", "Pages, APIs, public assets, SSR document metadata, and middleware run through the same Node server setup."],
  ["CLI-first DX", "litoho new, dev, build, start, doctor, generators, middleware stacks, and UI commands are part of the framework loop."],
  ["Security primitives", "Host allowlists, trusted proxy config, origin checks, CSRF, body limits, JSON parsing, timeouts, rate limit stores, CSP, cookies, and audit hooks are available in @litoho/server."],
  ["Ownable UI", "@litoho/ui supports selective imports and copy/diff/upgrade flows, while app-specific components live in src/components."]
] as const;

const tradeoffs = [
  ["Ecosystem size", "Litoho is much younger than Next, Nuxt, SvelteKit, and Astro. Expect fewer third-party recipes and more framework-level decision making from your team."],
  ["Adapter coverage", "The current production path is Node-oriented. If you need many official deployment adapters today, a mature framework may be safer."],
  ["Advanced rendering models", "Litoho intentionally avoids a broad React Server Components-style model. That keeps it simpler, but it is not a replacement for every advanced React workflow."],
  ["Plugin marketplace", "There is no large plugin/module marketplace yet. The upside is fewer hidden abstractions; the downside is less turnkey integration."],
  ["Team familiarity", "If a team already moves fast in React, Vue, or Svelte, switching to Lit should be a product decision, not a novelty decision."]
] as const;

const migrationPaths = [
  ["Manual Lit app", "Move routing into app/pages, APIs into app/api, reusable components into src/components, and let Litoho generate manifests."],
  ["React/Vue/Svelte app", "Treat migration as a rewrite of route ownership and UI primitives, not a drop-in port."],
  ["Content site", "Keep content-heavy static pages on Astro or add Litoho only when you need a Lit-first full-stack app shell."],
  ["Hono/Express API", "Keep domain logic and move request rendering/API composition into Litoho server modules when SSR pages become important."]
] as const;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Framework Comparison",
    "Compare Litoho with Next.js, Nuxt, SvelteKit, Astro, manual Lit apps, and generic full-stack starters. Learn when Litoho is a strong fit and when another framework is safer.",
    "/docs/comparison"
  ),
  render: () => html`
    ${renderDocHero(
      "Framework Comparison",
      "Litoho is not trying to be the biggest meta-framework. It is trying to make Lit-first full-stack apps feel coherent: file routes, SSR, APIs, UI primitives, security middleware, and CLI workflows in one explicit stack."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Positioning</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">A smaller full-stack path for teams that want Lit</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Litoho fits the space between a manual Lit + server setup and a large general-purpose meta-framework. You get
          conventions, SSR, API routes, generated manifests, public assets, middleware, and UI tooling without adopting a
          React-, Vue-, or Svelte-specific component model.
        </p>
      </article>

      <article class="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
        <div class="border-b border-white/10 p-6">
          <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">High-level comparison</h2>
          <p class="mt-3 text-sm leading-7 text-slate-400">
            This table is intentionally practical. It compares mental models and fit, not benchmarks or marketing
            claims. Mature frameworks win on ecosystem depth; Litoho wins when Lit-first explicitness is the goal.
          </p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[58rem] border-collapse text-left text-sm">
            <thead class="bg-white/[0.03] text-slate-300">
              <tr>
                <th class="border-b border-white/10 px-4 py-3 font-medium">Area</th>
                <th class="border-b border-white/10 px-4 py-3 font-medium text-amber-200">Litoho</th>
                <th class="border-b border-white/10 px-4 py-3 font-medium">Next.js</th>
                <th class="border-b border-white/10 px-4 py-3 font-medium">Nuxt</th>
                <th class="border-b border-white/10 px-4 py-3 font-medium">SvelteKit</th>
                <th class="border-b border-white/10 px-4 py-3 font-medium">Astro</th>
              </tr>
            </thead>
            <tbody class="text-slate-400">
              ${comparisonRows.map(
                ([area, litoho, next, nuxt, sveltekit, astro]) => html`
                  <tr class="odd:bg-white/[0.015]">
                    <td class="border-b border-white/10 px-4 py-3 text-slate-200">${area}</td>
                    <td class="border-b border-white/10 px-4 py-3 text-amber-100">${litoho}</td>
                    <td class="border-b border-white/10 px-4 py-3">${next}</td>
                    <td class="border-b border-white/10 px-4 py-3">${nuxt}</td>
                    <td class="border-b border-white/10 px-4 py-3">${sveltekit}</td>
                    <td class="border-b border-white/10 px-4 py-3">${astro}</td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </article>

      <section class="grid gap-6 lg:grid-cols-2">
        ${choices.map(
          (item) => html`
            <article class=${`rounded-3xl border ${item.tone} p-6`}>
              <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">${item.name}</h2>
              <div class="mt-4 grid gap-3">
                ${item.points.map(
                  (point) => html`
                    <p class="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300">${point}</p>
                  `
                )}
              </div>
            </article>
          `
        )}
      </section>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Where Litoho is strongest</h2>
        <div class="mt-5 grid gap-3 lg:grid-cols-2">
          ${litohoStrengths.map(
            ([title, body]) => html`
              <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <h3 class="text-base font-semibold text-white">${title}</h3>
                <p class="mt-2 text-sm leading-6 text-slate-400">${body}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Tradeoffs to be honest about</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho is intentionally narrow and young. That is a feature when you want fewer concepts, but a risk when you
          need a large ecosystem today.
        </p>
        <div class="mt-5 grid gap-3">
          ${tradeoffs.map(
            ([title, body]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[13rem_1fr]">
                <h3 class="text-sm font-semibold text-white">${title}</h3>
                <p class="text-sm leading-6 text-slate-400">${body}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Compared with a manual Lit setup</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          A manual Lit app is flexible, but teams usually end up rebuilding routing, SSR glue, route manifests, dev
          server wiring, API conventions, generated types, security middleware, UI primitives, and release smoke tests.
          Litoho’s value is making that glue repeatable.
        </p>
        ${renderCodeBlock(`Manual Lit + server
  -> maximum freedom
  -> you own every convention
  -> routing, SSR, APIs, security, and CLI are custom work

Litoho
  -> Lit remains the UI layer
  -> app/pages and app/api define ownership
  -> server/runtime/CLI conventions are already connected`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Migration thinking</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho is usually a better fit for new apps or isolated product surfaces than for drop-in rewrites of large
          mature apps. Use the migration path that matches where you are starting.
        </p>
        <div class="mt-5 grid gap-3">
          ${migrationPaths.map(
            ([from, path]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[12rem_1fr]">
                <code class="text-sm text-amber-200">${from}</code>
                <p class="text-sm leading-6 text-slate-400">${path}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Decision checklist</h2>
        <div class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
          <p>1. Pick Litoho if Lit is a first-class requirement, not an afterthought.</p>
          <p>2. Pick Litoho if explicit route files and generated manifests feel like an advantage.</p>
          <p>3. Pick a larger framework if you need a mature plugin ecosystem more than a small mental model.</p>
          <p>4. Pick a React/Vue/Svelte framework if your team’s component expertise is already deeply tied to that ecosystem.</p>
          <p>5. Pick Astro if the project is mostly content and islands, not a full-stack Lit application shell.</p>
        </div>
      </article>
    </section>
  `
};

export default page;
