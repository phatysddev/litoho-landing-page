import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero, renderStepList } from "../../../../src/docs";

const version = "0.1.4";

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Getting Started",
    "Install Litoho, scaffold a project, understand the generated structure, and run your first Lit-first full-stack app with SSR, API routes, CLI generators, and security checks.",
    "/docs/getting-started"
  ),
  render: () => html`
    ${renderDocHero(
      "Getting Started",
      "Copy the commands, run the app, see the page, hit the API, then generate your first route. This guide is optimized for a first successful Litoho loop."
    )}

    <section class="mb-8 overflow-hidden rounded-[2rem] border border-amber-300/20 bg-[radial-gradient(circle_at_top_left,rgba(248,196,68,0.16),transparent_32%),rgba(248,196,68,0.055)]">
      <div class="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <article class="p-5 sm:p-7">
          <p class="text-[0.68rem] uppercase tracking-[0.24em] text-amber-200 sm:text-xs sm:tracking-[0.32em]">5-minute success path</p>
          <h2 class="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">
            From empty folder to SSR page, API route, and production build.
          </h2>
          <p class="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            If you are evaluating Litoho, start here. The goal is not to learn every concept yet. The goal is to prove
            the framework loop works: scaffold, install, run, edit, generate, build.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a class="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-slate-950" href="#copy-run-success">
              Copy commands
            </a>
            <a class="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white" href="#first-example-project">
              See example project
            </a>
          </div>
        </article>

        <article id="copy-run-success" class="border-t border-white/10 bg-black/25 p-5 sm:p-7 lg:border-l lg:border-t-0">
          <p class="text-xs uppercase tracking-[0.28em] text-slate-400">Copy → run → success</p>
          ${renderCodeBlock(`npm exec litoho@${version} -- new hello-litoho
cd hello-litoho
npm install
npm run dev`)}
          <div class="mt-5 grid gap-3 text-sm leading-7 text-slate-300">
            <p>
              <span class="font-semibold text-white">Success:</span>
              open <code>http://localhost:3000</code> and you should see the generated Litoho homepage.
            </p>
            <p>
              <span class="font-semibold text-white">API check:</span>
              open <code>http://localhost:3000/api/health</code> and you should receive a JSON response.
            </p>
          </div>
        </article>
      </div>
    </section>

    <section class="mb-8 grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Prerequisites</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho targets a modern Node.js workflow. The scaffold uses TypeScript, Vite, Lit, Tailwind CSS, and the
          published <code>litoho</code> CLI.
        </p>
        ${renderCodeBlock(`node -v   # recommended: Node 20+
npm -v

# optional but useful
npm view litoho version`)}
      </article>

      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-300">Current docs target</p>
        <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">Litoho ${version}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          These docs describe the framework as of ${version}: Lit SSR, file-based routes, API handlers, route manifests,
          local components, UI primitives, state primitives, security middleware, audit hooks, and security-aware
          <code>litoho doctor</code>.
        </p>
      </article>
    </section>

    ${renderStepList([
      {
        title: "1. Scaffold the app",
        body: "This creates the project files, default routes, public assets, SSR server entry, Tailwind setup, and package scripts.",
        code: `npm exec litoho@${version} -- new my-app\ncd my-app`
      },
      {
        title: "2. Install dependencies",
        body: "Install from inside the generated app. The app depends on the published Litoho packages and the litoho CLI.",
        code: `npm install`
      },
      {
        title: "3. Start the single-port dev server",
        body: "Dev mode regenerates manifests, starts the SSR server, serves Vite client assets, and keeps page/API routing on one localhost port.",
        code: `npm run dev

# expected
# Litoho dev server running at http://localhost:3000`
      },
      {
        title: "4. Verify page and API routes",
        body: "Confirm SSR HTML and API handlers are both reachable. This proves the full-stack routing layer is wired correctly.",
        code: `curl http://localhost:3000
curl http://localhost:3000/api/health

# expected API shape
# { "ok": true, ... }`
      },
      {
        title: "5. Run doctor before writing more code",
        body: "Doctor validates route conventions and scans the server for missing security hardening. Run it early so problems stay small.",
        code: `npm exec litoho -- doctor --root .

# expected
# Litoho doctor passed`
      }
    ])}

    <section id="first-example-project" class="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-5 sm:p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-300">Example project</p>
        <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">Build a tiny products section</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          After the app boots, generate a real feature slice: a list page, a dynamic detail page, and a typed API route.
          This is the smallest useful example because it touches pages, params, APIs, manifests, and browser refresh.
        </p>
        ${renderCodeBlock(`npm exec litoho -- g p products
npm exec litoho -- g p products --params id
npm exec litoho -- g a products --params id --query q:number
npm run dev`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-slate-500">What you should see</p>
        <div class="mt-5 grid gap-4">
          <div class="rounded-2xl border border-white/10 bg-black/25 p-4">
            <p class="text-sm font-semibold text-white">Page routes</p>
            <p class="mt-2 text-sm leading-7 text-slate-400">
              <code>/products</code> renders from <code>app/pages/products/_index.ts</code>.
              <code>/products/123</code> renders from <code>app/pages/products/[id]/_index.ts</code>.
            </p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-black/25 p-4">
            <p class="text-sm font-semibold text-white">API route</p>
            <p class="mt-2 text-sm leading-7 text-slate-400">
              <code>/api/products/123?q=3</code> reaches <code>app/api/products/[id].ts</code> with typed
              <code>params.id</code> and parsed <code>queryData.q</code>.
            </p>
          </div>
          <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p class="text-sm font-semibold text-emerald-200">Success signal</p>
            <p class="mt-2 text-sm leading-7 text-emerald-50/80">
              If those three URLs work, you have completed the core Litoho loop.
            </p>
          </div>
        </div>
      </article>
    </section>

    <section class="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
      <div class="grid gap-0 lg:grid-cols-2">
        <article class="border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Before</p>
          <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">Manual Lit full-stack glue</h2>
          <p class="mt-3 text-sm leading-7 text-slate-400">
            You wire Vite, Lit SSR, page discovery, API routing, document metadata, middleware, static assets, and build
            scripts yourself. It works, but the convention lives in your head.
          </p>
          ${renderCodeBlock(`src/
server/
routes.ts
render-html.ts
vite-middleware.ts
api-router.ts
metadata.ts
...`)}
        </article>

        <article class="p-5 sm:p-6">
          <p class="text-xs uppercase tracking-[0.28em] text-amber-300">After</p>
          <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">Litoho keeps the convention visible</h2>
          <p class="mt-3 text-sm leading-7 text-slate-400">
            Your app is plain files: pages in <code>app/pages</code>, APIs in <code>app/api</code>, components in
            <code>src/components</code>, and one <code>server.ts</code> boundary.
          </p>
          ${renderCodeBlock(`app/pages/products/_index.ts
app/pages/products/[id]/_index.ts
app/api/products/[id].ts
src/components/product-card.ts
server.ts`)}
        </article>
      </div>
    </section>

    <section class="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)]">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Default structure</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho keeps framework-owned conventions visible. Pages, APIs, components, generated manifests, public assets,
          and the SSR server all live in predictable locations.
        </p>
        ${renderCodeBlock(`app/
  pages/
    _index.ts          # /
    _layout.ts         # root layout
    _not-found.ts      # optional custom 404
    _error.ts          # optional custom 500
  api/
    health.ts          # /api/health
    _middleware.ts     # optional API middleware stack
public/
  favicon.svg
  logo.svg
  robots.txt
src/
  components/          # app-owned Lit components
  generated/           # generated route manifests
server.ts              # SSR/API server entry
vite.config.ts
package.json`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-300">Strict convention</p>
        <h2 class="mt-4 text-xl font-semibold text-white">Pages use folder routes</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho intentionally prefers <code>app/pages/profile/_index.ts</code> over legacy
          <code>app/pages/profile.ts</code>. Doctor and route generation warn when old-style files appear.
        </p>
        <a class="mt-6 inline-flex text-sm font-medium text-white transition hover:text-amber-300" href="/docs/routing">
          Read routing docs
        </a>
      </article>
    </section>

    <section class="mt-8 grid gap-6 lg:grid-cols-2">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">A minimal page module</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          A page can define metadata, load server data, and render Lit templates from one route module.
        </p>
        ${renderCodeBlock(`import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";

const page: LitoPageModule = {
  document: {
    title: "Home",
    meta: [{ name: "description", content: "A Litoho page." }]
  },
  load: () => ({ message: "Rendered on the server" }),
  render: ({ data }) => html\`
    <main>
      <h1>\${data.message}</h1>
    </main>
  \`
};

export default page;`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">A typed API route</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          API modules live under <code>app/api</code>. Use <code>defineApiRoute()</code> when you want typed params and
          query parsing.
        </p>
        ${renderCodeBlock(`import { defineApiRoute } from "@litoho/server";

export default defineApiRoute<{ id: string }, { q: "number" }>({
  query: { q: "number" },
  get: ({ params, queryData }) =>
    Response.json({
      id: params.id,
      q: queryData.q
    })
});

// app/api/products/[id].ts -> /api/products/:id`)}
      </article>
    </section>

    <section class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Generate instead of hand-wiring</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          The CLI keeps route names, folder structure, components, UI primitives, and middleware stacks aligned with the
          current convention.
        </p>
        ${renderCodeBlock(`npm exec litoho -- g p docs/reference
npm exec litoho -- g p products --params id
npm exec litoho -- g a products --params id --query q:number
npm exec litoho -- g c profile/card --page profile --with-ui button,card
npm exec litoho -- g ms secure-api --force`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">State and client-side interaction</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          For interactive islands, use app-local Lit components with core state primitives. The server still owns the
          initial HTML and route data.
        </p>
        ${renderCodeBlock(`import { signal, memo, watch, batch, store } from "@litoho/core";

const count = signal(0);
const doubled = memo(() => count.value * 2);

watch(() => {
  console.log(count.value, doubled.value);
}, [count, doubled]);

batch(() => {
  count.value += 1;
  count.value += 1;
});`)}
      </article>
    </section>

    <section class="mt-8 rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
      <p class="text-xs uppercase tracking-[0.28em] text-amber-300">Production early</p>
      <h2 class="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">Add security before the first public deploy</h2>
      <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
        New apps can run without every production guard enabled, but public apps should configure the server boundary and
        mutation protections before launch.
      </p>
      ${renderCodeBlock(`createLitoServer({
  allowedHosts: ["app.example.com"],
  trustedProxy: { hops: 1 },
  audit: { onEvent(event) { console.log(event.type); } },
  middlewares: [
    withRequestTimeout(),
    withRateLimit(),
    withBodyLimit(),
    withJsonBody(),
    withOriginCheck(),
    withCsrf(),
    withCsp()
  ]
});`)}
      <a class="mt-5 inline-flex text-sm font-medium text-amber-100 transition hover:text-white" href="/docs/security">
        Read the security hardening guide
      </a>
    </section>

    <section class="mt-8 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
      <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Recommended first edits</h2>
      <p class="mt-3 text-sm leading-7 text-slate-400">
        After first boot, make one page edit, one API edit, one CLI-generated route, and one production check. That
        validates the full development loop.
      </p>
      ${renderCodeBlock(`1) Edit app/pages/_index.ts and refresh the browser
2) Add or update app/api/health.ts
3) Run: npm exec litoho -- g p docs/reference
4) Run: npm exec litoho -- doctor --root .
5) Run: npm run build
6) Run: npm start`)}
    </section>
  `
};

export default page;
