import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, docsNavigation } from "../../src/docs";

const litohoVersion = "0.1.3";
const featuredDocs = docsNavigation.slice(0, 6);

const frameworkFacts = [
  {
    label: "Routes",
    title: "Folder routes with strict conventions",
    body: "Pages live in app/pages with _index.ts for addressable routes, _layout.ts for nested wrappers, and special _not-found.ts / _error.ts modules."
  },
  {
    label: "Server",
    title: "SSR, API routes, and document metadata",
    body: "The server renders Lit templates, serves app/api handlers, reads generated manifests, and lets each route define title, meta, links, and styles."
  },
  {
    label: "Client",
    title: "Lit components with explicit hydration",
    body: "Use app-local Lit components in src/components, client boot via @litoho/app, and core state primitives such as signal(), memo(), watch(), batch(), and store()."
  },
  {
    label: "DX",
    title: "CLI generators instead of hidden magic",
    body: "litoho new, dev, build, start, doctor, route generation, component generation, UI add/diff/upgrade, and middleware-stack presets keep project structure repeatable."
  }
] as const;

const securityFacts = [
  "allowedHosts rejects unexpected Host / X-Forwarded-Host values before routing.",
  "trustedProxy keeps forwarded IP, host, and protocol disabled until explicitly enabled.",
  "withOriginCheck and withCsrf protect browser mutation requests.",
  "withBodyLimit and withJsonBody guard request bodies before handlers parse them.",
  "withRequestTimeout aborts slow requests and exposes the timeout AbortSignal.",
  "withRateLimit supports a default memory store and custom Redis/KV-style store adapters.",
  "secure cookie helpers encode values, reject unsafe attributes, and support set/delete flows.",
  "audit.onEvent receives framework security events for logging or SIEM pipelines."
] as const;

const comparisons = [
  {
    title: "Smaller mental model than large React meta-frameworks",
    body: "Litoho focuses on Lit, SSR, route manifests, API handlers, CLI generators, and production middleware. It does not ask you to learn a large React-only runtime model first."
  },
  {
    title: "More framework leverage than manual Lit setups",
    body: "You still own plain files, but Litoho gives you routing, server glue, manifest generation, document metadata, app boot, and CLI workflows without rebuilding them per project."
  },
  {
    title: "More explicit ownership than opaque starters",
    body: "Routes stay in app/pages, APIs stay in app/api, local components stay in src/components, and UI primitives are imported or copied intentionally."
  }
] as const;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho, the Lit-first full-stack framework",
    "Litoho is a Lit-first full-stack framework with SSR, file-based routing, API routes, local Lit components, UI primitives, CLI generators, and production security middleware.",
    "/"
  ),
  render: () => html`
    <main>
      <section class="relative overflow-hidden border-b border-white/10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,_rgba(248,196,68,0.2),_transparent_25%),radial-gradient(circle_at_82%_18%,_rgba(56,189,248,0.16),_transparent_22%),linear-gradient(180deg,_rgba(2,6,23,0.72),_rgba(2,6,23,0.96))]"></div>
        <div class="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl gap-16 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] lg:items-center lg:py-20">
          <section class="max-w-3xl">
            <div class="mb-6 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.36em] text-amber-300">
              <img src="/logo.png" alt="Litoho logo" class="h-10 w-10 object-contain" />
              Litoho ${litohoVersion}
            </div>
            <h1 class="text-5xl font-semibold tracking-[-0.08em] text-white sm:text-7xl lg:text-[5.8rem]">
              The Lit-first full-stack framework.
            </h1>
            <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Litoho combines Lit SSR, folder-based pages, API routes, generated manifests, CLI workflows, local
              components, selective UI primitives, and security middleware in one readable Node framework.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
              <a
                class="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5"
                href="/docs/getting-started"
              >
                Get Started
              </a>
              <a
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/60"
                href="/docs/security"
              >
                Security Model
              </a>
            </div>
            <div class="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>Lit SSR</span>
              <span class="h-1 w-1 rounded-full bg-slate-500"></span>
              <span>app/pages</span>
              <span class="h-1 w-1 rounded-full bg-slate-500"></span>
              <span>app/api</span>
              <span class="h-1 w-1 rounded-full bg-slate-500"></span>
              <span>CLI generators</span>
              <span class="h-1 w-1 rounded-full bg-slate-500"></span>
              <span>Security doctor</span>
            </div>
          </section>

          <aside class="relative">
            <div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-300/18 via-transparent to-sky-300/10 blur-2xl"></div>
            <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.28em] text-slate-400">Install</p>
                  <h2 class="mt-2 text-2xl font-semibold text-white">Start from the published CLI</h2>
                </div>
                <span class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  npm
                </span>
              </div>
              <div class="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm leading-7 text-slate-200">
                <div>$ npm exec litoho@${litohoVersion} -- new app</div>
                <div>$ cd app</div>
                <div>$ npm install</div>
                <div>$ npm run dev</div>
                <div>$ npm exec litoho -- doctor --root .</div>
              </div>
              <div class="mt-6 grid gap-4">
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p class="text-xs uppercase tracking-[0.28em] text-amber-300">What ships today</p>
                  <p class="mt-3 text-sm leading-7 text-slate-300">
                    Version ${litohoVersion} includes SSR document metadata, route manifests, UI primitives, component
                    generators, Tailwind-friendly app templates, security middleware, audit hooks, and production doctor
                    checks.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="mx-auto grid w-full max-w-7xl gap-10 px-6 py-18 sm:px-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
        <div class="max-w-xl">
          <p class="text-xs uppercase tracking-[0.32em] text-amber-300">Framework Shape</p>
          <h2 class="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
            A complete Lit stack without turning your app into a black box.
          </h2>
          <p class="mt-5 text-base leading-8 text-slate-300">
            Litoho keeps the important parts visible: file routes, page modules, API handlers, server middleware,
            generated manifests, and local components. The framework adds structure, not mystery.
          </p>
        </div>

        <div class="grid gap-5">
          ${frameworkFacts.map(
            (item) => html`
              <article class="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-[8rem_minmax(0,1fr)]">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">${item.label}</p>
                <div>
                  <h3 class="text-lg font-semibold tracking-[-0.03em] text-white">${item.title}</h3>
                  <p class="mt-2 text-sm leading-7 text-slate-400">${item.body}</p>
                </div>
              </article>
            `
          )}
        </div>
      </section>

      <section class="border-y border-white/10 bg-white/[0.02]">
        <div class="mx-auto w-full max-w-7xl px-6 py-18 sm:px-8">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.32em] text-amber-300">Core Advantages</p>
              <h2 class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">Built to make Lit feel complete on the server.</h2>
            </div>
            <a class="text-sm font-medium text-slate-300 transition hover:text-white" href="/docs/seo">
              Read SEO and SSR details
            </a>
          </div>

          <div class="mt-10 grid gap-4 lg:grid-cols-3">
            <article class="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Rendering</p>
              <h3 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">SSR with route metadata</h3>
              <p class="mt-3 text-sm leading-7 text-slate-400">
                Page and layout modules can define document metadata while the server renders Lit output into HTML for
                search engines, link previews, and fast first paint.
              </p>
            </article>
            <article class="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Routing</p>
              <h3 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">_index.ts, layouts, and APIs</h3>
              <p class="mt-3 text-sm leading-7 text-slate-400">
                <code>app/pages/products/[id]/_index.ts</code> maps to <code>/products/:id</code>, layouts compose by
                folder, and <code>app/api</code> routes are served by the same app.
              </p>
            </article>
            <article class="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Workflow</p>
              <h3 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">Generators that leave plain files</h3>
              <p class="mt-3 text-sm leading-7 text-slate-400">
                Generate pages, APIs, layouts, resources, middleware stacks, and Lit components, then keep editing normal
                TypeScript project files.
              </p>
            </article>
            <article class="rounded-[1.75rem] border border-amber-300/20 bg-amber-300/[0.06] p-6 lg:col-span-3">
              <p class="text-xs uppercase tracking-[0.3em] text-amber-300">Production Readiness</p>
              <h3 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">Security middleware that stays readable.</h3>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                Configure host allowlists, trusted proxies, CSP, CSRF, origin checks, request body limits, timeout guards,
                rate limit adapters, secure cookies, and audit events without leaving the Litoho server contract.
              </p>
              <a class="mt-5 inline-flex text-sm font-medium text-amber-200 transition hover:text-white" href="/docs/security">
                Open security docs
              </a>
            </article>
          </div>
        </div>
      </section>

      <section class="mx-auto grid w-full max-w-7xl gap-10 px-6 py-18 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div>
          <p class="text-xs uppercase tracking-[0.32em] text-amber-300">Security Model</p>
          <h2 class="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
            Built-in guardrails for public web apps.
          </h2>
          <p class="mt-5 text-base leading-8 text-slate-300">
            Security features are normal middleware and server options, so teams can see exactly what runs before route
            handlers.
          </p>
        </div>
        <div class="grid gap-3">
          ${securityFacts.map(
            (fact) => html`
              <div class="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-7 text-slate-300">
                ${fact}
              </div>
            `
          )}
        </div>
      </section>

      <section class="border-y border-white/10 bg-slate-950/50">
        <div class="mx-auto grid w-full max-w-7xl gap-8 px-6 py-18 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p class="text-xs uppercase tracking-[0.32em] text-amber-300">How It Compares</p>
            <h2 class="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Litoho chooses a narrow, explicit path.
            </h2>
          </div>
          <div class="grid gap-6">
            ${comparisons.map(
              (item) => html`
                <article class="border-t border-white/10 pt-5">
                  <p class="text-sm font-semibold text-white">${item.title}</p>
                  <p class="mt-3 text-sm leading-7 text-slate-400">${item.body}</p>
                </article>
              `
            )}
          </div>
        </div>
      </section>

      <section class="mx-auto w-full max-w-7xl px-6 py-18 sm:px-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.32em] text-amber-300">Documentation</p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">Everything important is one route away.</h2>
          </div>
          <a class="text-sm font-medium text-slate-300 transition hover:text-white" href="/docs">
            Browse all docs
          </a>
        </div>

        <div class="mt-10 grid gap-4 lg:grid-cols-2">
          ${featuredDocs.map(
            (item) => html`
              <a
                class="group block rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 transition duration-200 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-slate-950"
                href=${item.href}
              >
                <p class="text-xs uppercase tracking-[0.3em] text-slate-500">${item.kicker}</p>
                <h3 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">${item.title}</h3>
                <p class="mt-3 max-w-xl text-sm leading-7 text-slate-400">${item.description}</p>
                <p class="mt-6 text-sm font-medium text-amber-300 transition group-hover:translate-x-1">Open route</p>
              </a>
            `
          )}
        </div>
      </section>
    </main>
  `
};

export default page;
