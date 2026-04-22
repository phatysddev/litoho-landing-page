import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const deploymentSteps = [
  ["Install", "Install production and dev dependencies so TypeScript, Vite, tsx, and litoho CLI are available during build."],
  ["Generate + build", "npm run build regenerates route manifests and creates the Vite client bundle plus dist/manifest.json."],
  ["Configure env", "Set NODE_ENV=production, PORT, SITE_URL, secrets, host allowlists, and platform-specific variables."],
  ["Start server", "npm start runs litoho start, regenerates manifests, and starts server.ts with NODE_ENV=production."],
  ["Smoke test", "Verify pages, API routes, public assets, robots.txt, sitemap.xml, and security headers."],
  ["Observe", "Send logs, audit events, request IDs, and platform metrics to your monitoring stack."]
] as const;

const artifacts = [
  ["dist/", "Vite output directory for client assets."],
  ["dist/manifest.json", "Asset manifest used by createManifestClientAssets() in production."],
  ["src/generated/page-manifest.ts", "Generated page manifest with route paths, route IDs, layouts, and route modes."],
  ["src/generated/api-manifest.ts", "Generated API module import list."],
  ["server.ts", "Runtime entrypoint that loads manifests and starts the Node server."],
  ["public/", "Directly served public files such as logo.png, robots.txt, and sitemap.xml."]
] as const;

const envVars = [
  ["NODE_ENV", "Use production for production runtime."],
  ["PORT", "HTTP port used by the Node server. Defaults to 3000."],
  ["SITE_URL", "Canonical public site URL used for sitemap, robots, canonical links, and allowed hosts."],
  ["LITOHO_HMR_PORT", "Development only. Overrides Vite HMR WebSocket port."],
  ["App secrets", "Database URLs, API keys, auth secrets, and provider tokens. Never expose them to client code."]
] as const;

const buildCommands = `npm ci
npm run build
npm exec litoho -- doctor --root .
NODE_ENV=production PORT=3000 npm start`;

const serverEntryExample = `import { loadLitoAppFromManifest } from "@litoho/app";
import { resolve } from "node:path";
import { startLitoNodeApp } from "@litoho/server";
import { apiModulePaths } from "./src/generated/api-manifest";
import { pageManifest } from "./src/generated/page-manifest";

const manifestBaseUrl = new URL("./src/generated/", import.meta.url);
const app = await loadLitoAppFromManifest({
  manifestBaseUrl,
  pageManifest,
  apiModulePaths
});

await startLitoNodeApp({
  appName: "Litoho App",
  rootDir: resolve(process.cwd()),
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  port: Number(process.env.PORT ?? 3000),
  pages: app.pages,
  apiRoutes: app.apiRoutes,
  middlewares: app.middlewares,
  notFoundPage: app.notFoundPage,
  errorPage: app.errorPage
});`;

const hardenedServerExample = `const siteUrl = process.env.SITE_URL ?? "https://app.example.com";
const siteHost = new URL(siteUrl).host;
const isProduction = process.env.NODE_ENV === "production";

await startLitoNodeApp({
  appName: "Acme App",
  rootDir: resolve(process.cwd()),
  mode: isProduction ? "production" : "development",
  port: Number(process.env.PORT ?? 3000),
  // For custom hardened apps, use createLitoServer directly or pass
  // security middleware through the loaded app/middleware stack.
});`;

const dockerExample = `FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]`;

const pm2Example = `npm install --omit=dev
npm run build
NODE_ENV=production PORT=3000 npm start

# process manager example
pm2 start "npm start" --name litoho-app`;

const smokeCommands = `curl -I http://localhost:3000/
curl -I http://localhost:3000/logo.png
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/sitemap.xml
curl -s http://localhost:3000/api/health
curl -s http://localhost:3000/docs/security | grep "<title>"`;

const reverseProxyExample = `# Nginx-style shape
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-Host $host;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}`;

const commonIssues = [
  ["Route not found after deploy", "Run npm run generate:routes or npm run build before starting. Check that generated manifests are included in the deployment artifact."],
  ["Assets 404", "Confirm dist/manifest.json exists, dist/assets exists, public/ exists, and server runs from the project root."],
  ["Wrong canonical URLs", "Set SITE_URL in production and avoid trailing slash drift when building canonical links or sitemap entries."],
  ["Host rejected", "Update allowedHosts to include the public host or forwarded host used by your platform."],
  ["HMR WebSocket conflict in dev", "Use litoho dev --hmr-port 3030 or LITOHO_HMR_PORT in development only."],
  ["CSP blocks scripts/styles", "Start with reportOnly CSP, inspect violations, then add only the required sources before enforcing."],
  ["API body rejected", "Check withBodyLimit and withJsonBody limits/content-type. JSON requests should send Content-Type: application/json."]
] as const;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Deployment",
    "Build and deploy a Litoho app by generating route manifests, building Vite assets, serving public files, running the Node SSR server, and verifying production hardening.",
    "/docs/deployment"
  ),
  render: () => html`
    ${renderDocHero(
      "Build and Deploy",
      "Litoho production deployment has one core shape: build client assets, load generated manifests, serve public files, and run the SSR/API Node server with explicit environment and security settings."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Production loop</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">The minimal deploy sequence</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Build once, run the Node server in production mode, then verify routes and assets from the public URL. The
          generated scaffold already includes <code>npm run build</code> and <code>npm start</code>.
        </p>
        ${renderCodeBlock(buildCommands)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Deployment stages</h2>
        <div class="mt-5 grid gap-3 lg:grid-cols-2">
          ${deploymentSteps.map(
            ([title, body], index) => html`
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-300/15 text-xs font-semibold text-amber-200">
                  ${index + 1}
                </span>
                <h3 class="mt-3 text-base font-semibold text-white">${title}</h3>
                <p class="mt-2 text-sm leading-6 text-slate-400">${body}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">What gets deployed</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Production mode reads Vite's manifest to attach the right client assets to SSR HTML. Public files are served
          directly before page routing, so URLs like <code>/logo.png</code> and <code>/robots.txt</code> work without a
          page route.
        </p>
        <div class="mt-5 grid gap-3">
          ${artifacts.map(
            ([name, description]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-[14rem_1fr]">
                <code class="text-sm text-amber-200">${name}</code>
                <p class="text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Server entrypoint</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          A generated app uses <code>startLitoNodeApp()</code>. It wires Vite dev middleware in development and switches
          to <code>createManifestClientAssets()</code>, <code>dist/</code>, and <code>public/</code> in production.
        </p>
        ${renderCodeBlock(serverEntryExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Environment variables</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Keep runtime configuration outside the bundle. Only expose values to the browser deliberately through route
          data or explicit client-safe config.
        </p>
        <div class="mt-5 grid gap-3">
          ${envVars.map(
            ([name, description]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-[12rem_1fr]">
                <code class="text-sm text-sky-200">${name}</code>
                <p class="text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
        ${renderCodeBlock(`NODE_ENV=production
PORT=3000
SITE_URL=https://litoho.dev
DATABASE_URL=postgres://...
SESSION_SECRET=...`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Host and proxy configuration</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          On platforms with reverse proxies or load balancers, configure forwarded headers and trusted proxy behavior
          intentionally. Do not trust forwarded headers on raw public traffic.
        </p>
        ${renderCodeBlock(reverseProxyExample)}
        ${renderCodeBlock(hardenedServerExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Docker shape</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Use a build stage for dependencies and Vite output, then run the same app with <code>npm start</code>. For very
          small images, you can refine this later by pruning dev dependencies after build.
        </p>
        ${renderCodeBlock(dockerExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Node host or VM shape</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          On a VPS, PaaS, or long-running Node host, use a process manager or platform supervisor. The process should
          restart on crash and receive environment variables from the platform, not from committed files.
        </p>
        ${renderCodeBlock(pm2Example)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Production hardening</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Before exposing a Litoho app publicly, configure boundary checks, mutation protections, CSP, and audit hooks.
          Run <code>litoho doctor</code> to catch missing high-priority hardening.
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
  withSecurityHeaders(),
  withCsp()
]
audit: { onEvent(event) { /* send to logs/SIEM */ } }`)}
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Smoke test after deploy</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Verify from outside the server when possible. Local checks are useful, but the public URL is where host
          allowlists, proxy headers, TLS, CSP, and asset paths prove themselves.
        </p>
        ${renderCodeBlock(smokeCommands)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Common production issues</h2>
        <div class="mt-5 grid gap-3">
          ${commonIssues.map(
            ([issue, fix]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[14rem_1fr]">
                <h3 class="text-sm font-semibold text-white">${issue}</h3>
                <p class="text-sm leading-6 text-slate-400">${fix}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Deployment checklist</h2>
        <div class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
          <p>1. Commit route changes and run <code>npm run build</code>.</p>
          <p>2. Run <code>npm exec litoho -- doctor --root .</code>.</p>
          <p>3. Confirm <code>dist/manifest.json</code>, <code>src/generated/*</code>, and <code>public/*</code> are included.</p>
          <p>4. Set <code>NODE_ENV=production</code>, <code>PORT</code>, <code>SITE_URL</code>, and app secrets.</p>
          <p>5. Configure allowed hosts, trusted proxy, CSP, CSRF, origin checks, rate limits, and audit logs.</p>
          <p>6. Start with <code>npm start</code> or your process manager.</p>
          <p>7. Smoke-test pages, APIs, public assets, robots, sitemap, and security headers.</p>
        </div>
      </article>
    </section>
  `
};

export default page;
