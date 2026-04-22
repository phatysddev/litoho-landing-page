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
      "Create a Litoho app, understand the generated files, run the single-port dev server, and verify the first page, API route, build, and security doctor."
    )}

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
        title: "Scaffold the app",
        body: "Use the published CLI to generate a project that already follows Litoho routing, SSR, Tailwind, and server conventions.",
        code: `npm exec litoho@${version} -- new my-app\ncd my-app`
      },
      {
        title: "Install dependencies",
        body: "The scaffold includes package scripts for route generation, dev, build, and production start. Install once from the project root.",
        code: `npm install`
      },
      {
        title: "Start the dev server",
        body: "Dev mode regenerates route manifests, starts the SSR server, and wires Vite client assets on the same app server.",
        code: `npm run dev\n# open http://localhost:3000`
      },
      {
        title: "Verify page and API routes",
        body: "Confirm SSR HTML and API handlers are both reachable before adding product code.",
        code: `curl http://localhost:3000\ncurl http://localhost:3000/api/health`
      },
      {
        title: "Run doctor",
        body: "Doctor validates route conventions and scans server security posture for production hardening gaps.",
        code: `npm exec litoho -- doctor --root .`
      }
    ])}

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
