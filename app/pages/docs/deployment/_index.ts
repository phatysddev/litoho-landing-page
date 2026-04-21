import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Deployment",
    "Build and deploy a Litoho app by generating client assets and running the SSR server in production mode.",
    "/docs/deployment"
  ),
  render: () => html`
    ${renderDocHero(
      "Build and Deploy",
      "Litoho production flow is simple: generate assets, start SSR server, and run with explicit environment config."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Production commands</h2>
        ${renderCodeBlock(`npm run build\nnpm start`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Environment variables</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Keep runtime values in environment variables and inject only what each route actually needs.
        </p>
        ${renderCodeBlock(`NODE_ENV=production
PORT=3000
SITE_URL=https://litoho.dev
# add your app-specific variables here`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">What gets built</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Vite builds the client assets while the server keeps loading the generated page and API manifests for SSR.
        </p>
        ${renderCodeBlock(`dist/\nsrc/generated/page-manifest.ts\nsrc/generated/api-manifest.ts\nserver.ts`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Deployment checklist</h2>
        ${renderCodeBlock(`1) npm ci
2) npm run build
3) set NODE_ENV and PORT
4) npm exec litoho -- doctor --root .
5) npm start
6) verify /, /docs/security, /robots.txt, /sitemap.xml, and /api/health`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Production hardening</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Before exposing a Litoho app publicly, configure the server boundary and mutation protections intentionally.
        </p>
        ${renderCodeBlock(`allowedHosts: ["app.example.com"]
trustedProxy: { hops: 1 }
middlewares: [
  withRequestTimeout(),
  withRateLimit(),
  withBodyLimit(),
  withJsonBody(),
  withOriginCheck(),
  withCsrf(),
  withCsp()
]
audit: { onEvent(event) { /* send to logs/SIEM */ } }`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Common production issues</h2>
        ${renderCodeBlock(`Issue: Route not found
Check: route file name and run npm run generate:routes

Issue: Static assets missing
Check: dist output exists and server runs from project root

Issue: Unexpected runtime env
Check: NODE_ENV/PORT and secret variable injection`) }
      </article>
    </section>
  `
};

export default page;
