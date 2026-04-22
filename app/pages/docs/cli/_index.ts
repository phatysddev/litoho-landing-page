import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const commandGroups = [
  ["new", "Scaffold a complete Litoho app with pages, API, server, Vite, public assets, and starter scripts."],
  ["dev", "Generate route manifests, start the SSR server through tsx watch, and keep manifests fresh with chokidar."],
  ["build", "Generate route manifests and build the client bundle with Vite."],
  ["start", "Generate route manifests and run server.ts with NODE_ENV=production."],
  ["doctor", "Validate route conventions, special files, middleware presence, and production security posture."],
  ["generate / g / -g", "Create pages, APIs, layouts, resources, middleware, and components."],
  ["ui", "Add, inspect, diff, copy, and upgrade @litoho/ui primitives."],
  ["add ui / a ui", "Shortcut namespace for UI installation commands."]
] as const;

const generatorRows = [
  ["routes", "Regenerate src/generated/page-manifest.ts and api-manifest.ts."],
  ["page / p", "Create app/pages/**/_index.ts with optional params, SSR/CSR directive, and demo templates."],
  ["api / a", "Create app/api route modules with typed params and typed query helpers."],
  ["layout / l", "Create app/pages/**/_layout.ts for nested shells and shared layout data."],
  ["component / c", "Create src/components Lit components, optionally import them into a page and compose @litoho/ui."],
  ["resource / r", "Create a CRUD-style set of pages and APIs for a resource."],
  ["middleware / m", "Create app/api/_middleware.ts from templates such as auth, cors, logger, timing, and rate-limit."],
  ["middleware-stack / ms", "Create preset middleware stacks such as web, api, secure-api, and browser-app."],
  ["not-found / nf", "Create app/pages/_not-found.ts."],
  ["error / err", "Create app/pages/_error.ts."]
] as const;

const uiComponents = ["badge", "button", "card", "dialog", "dropdown", "input", "textarea", "select", "tabs", "toast"] as const;
const uiPresets = [
  ["form", "input, textarea, select, button"],
  ["overlay", "dialog, dropdown, toast, button"],
  ["content", "card, badge, button"],
  ["navigation", "tabs, dropdown, button"]
] as const;

const lifecycleCommands = `npm exec litoho@latest -- new my-app
cd my-app
npm install
npm run dev
npm run build
npm start`;

const devCommands = `litoho dev
litoho dev --root .
litoho dev --hmr-port 3030
litoho dev --hmr-host localhost --hmr-protocol ws
LITOHO_DEV_DEBUG=true litoho dev
LITOHO_DEV_EXCLUDE="tmp/**,coverage/**" litoho dev`;

const generateExamples = `litoho g routes
litoho g p docs/getting-started
litoho g p products --params id
litoho g p counter-lab --template client-counter
litoho g p server-snapshot --template server-data
litoho g p api-lab --template api-inspector
litoho g p missing-lab --template not-found-demo
litoho g p failure-lab --throw-demo
litoho g a products --params id --query q:number,draft:boolean,tag:strings
litoho g r products --params id
litoho g l docs
litoho g nf
litoho g err`;

const componentExamples = `litoho g c hero/banner
litoho g c marketing/pricing-card --tag marketing-pricing-card
litoho g c hero/banner --page landing
litoho g c --page profile/card
litoho g c profile/card --with-ui button,card`;

const middlewareExamples = `litoho g middleware auth
litoho g middleware cors
litoho g middleware rate-limit
litoho g m --template logger
litoho g m --template timing --force
litoho g ms web
litoho g ms api --force
litoho g ms secure-api --force
litoho g ms browser-app --force`;

const uiExamples = `litoho ui list
litoho ui info dialog
litoho ui info form
litoho ui add badge
litoho ui add badge button card
litoho ui add form
litoho ui add overlay --copy
litoho add ui dialog --file app/pages/admin/_layout.ts
litoho ui diff
litoho ui diff overlay
litoho ui upgrade
litoho ui upgrade overlay --force`;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho CLI",
    "Use the Litoho CLI to scaffold projects, run dev/build/start, generate pages, APIs, layouts, middleware, components, manage @litoho/ui, and verify project health.",
    "/docs/cli"
  ),
  render: () => html`
    ${renderDocHero(
      "CLI Workflow",
      "The Litoho CLI is the safest way to stay inside framework conventions. Use it to scaffold apps, generate route files, install UI primitives, keep manifests fresh, and run doctor checks before shipping."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Quick start</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Create and run a Litoho app</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Published projects can start from <code>npm exec litoho@latest</code>. New apps include npm scripts that call
          the same CLI under the hood, so daily commands become <code>npm run dev</code>, <code>npm run build</code>, and
          <code>npm start</code>.
        </p>
        ${renderCodeBlock(lifecycleCommands)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Command surface</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          These are the top-level command families available in the current CLI. Most project commands accept
          <code>--root &lt;dir&gt;</code>, which defaults to the current working directory.
        </p>
        <div class="mt-5 grid gap-3">
          ${commandGroups.map(
            ([name, description]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[12rem_1fr]">
                <code class="text-sm text-amber-200">${name}</code>
                <p class="text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Development server</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>litoho dev</code> generates manifests once, starts <code>tsx watch server.ts</code>, and watches
          <code>app/pages</code> plus <code>app/api</code> with chokidar. Route changes regenerate manifests without
          forcing the app into a restart loop.
        </p>
        ${renderCodeBlock(devCommands)}
        <p class="mt-4 text-sm leading-7 text-slate-400">
          Use <code>--hmr-port</code> when another process already owns the Vite HMR WebSocket port. Use
          <code>LITOHO_DEV_DEBUG=true</code> to see which file caused manifest regeneration or a server restart.
        </p>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Build, start, and generated manifests</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Build and start both regenerate route manifests first. This means production uses the latest
          <code>src/generated/page-manifest.ts</code> and <code>src/generated/api-manifest.ts</code> before Vite or the
          Node server runs.
        </p>
        ${renderCodeBlock(`litoho generate routes
litoho build --root .
litoho start --root .`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Generate commands</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Generation supports three entry styles: <code>litoho generate</code>, <code>litoho g</code>, and
          <code>litoho -g</code>. Short aliases keep repetitive framework work quick without hiding the convention.
        </p>
        <div class="mt-5 grid gap-3">
          ${generatorRows.map(
            ([name, description]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-[12rem_1fr]">
                <code class="text-sm text-sky-200">${name}</code>
                <p class="text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
        ${renderCodeBlock(generateExamples)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Pages, params, mode, and templates</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Page generation writes <code>app/pages/**/_index.ts</code>. Add params with <code>--params</code>, choose route
          mode with <code>--ssr</code> or <code>--csr</code>, and use templates for quick demos.
        </p>
        ${renderCodeBlock(`litoho g p products --params id
  -> app/pages/products/[id]/_index.ts

litoho g p dashboard --csr
  -> writes "use client"; at the top of the page

litoho g p server-snapshot --template server-data
  -> creates a server-data example page`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">API routes and typed query flags</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          API generation writes files under <code>app/api</code>. Params become bracket segments, and
          <code>--query</code> can scaffold typed query access for <code>string</code>, <code>number</code>,
          <code>boolean</code>, and <code>strings</code>.
        </p>
        ${renderCodeBlock(`litoho g a users --params id
  -> app/api/users/[id].ts

litoho g a products --params id --query q:number,draft:boolean,tag:strings
  -> typed params.id, query.q, query.draft, and query.tag`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Components</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Component generation writes Lit components under <code>src/components</code>. With <code>--page</code>, the CLI
          imports the component into a page and inserts a usage snippet. With <code>--with-ui</code>, it composes the new
          component with selected <code>@litoho/ui</code> primitives.
        </p>
        ${renderCodeBlock(componentExamples)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Middleware generators</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Middleware templates create <code>app/api/_middleware.ts</code>. Middleware stacks create fuller presets for
          web apps and APIs. Use <code>--force</code> when you intentionally want to overwrite an existing middleware
          file.
        </p>
        ${renderCodeBlock(middlewareExamples)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">@litoho/ui commands</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          UI commands can add package imports or copy source files locally, similar to the shadcn workflow. If
          <code>--file</code> is omitted, the CLI targets <code>app/pages/_layout.ts</code>, then
          <code>app/pages/_index.ts</code>, or creates a root layout if needed.
        </p>
        ${renderCodeBlock(uiExamples)}

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <h3 class="text-lg font-semibold text-white">Components</h3>
            <p class="mt-3 text-sm leading-7 text-slate-400">${uiComponents.join(", ")}</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <h3 class="text-lg font-semibold text-white">Presets</h3>
            <div class="mt-3 grid gap-2 text-sm leading-6 text-slate-400">
              ${uiPresets.map(([name, parts]) => html`<p><code>${name}</code>: ${parts}</p>`)}
            </div>
          </div>
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Doctor and security checks</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>litoho doctor</code> catches legacy page filenames, missing special conventions, middleware shape issues,
          and production hardening gaps. The security posture scan looks for host allowlists, trusted proxy config,
          origin checks, CSRF, body limits, safe JSON parsing, CSP/security headers, rate limits, request timeouts, and
          audit hooks.
        </p>
        ${renderCodeBlock(`litoho doctor
litoho doctor --root examples/ui-showcase`)}
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Daily CLI loop</h2>
        <div class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
          <p>1. Generate structure with <code>litoho g ...</code> instead of hand-writing route paths.</p>
          <p>2. Run <code>npm run dev</code> while editing pages, APIs, layouts, and components.</p>
          <p>3. Run <code>litoho doctor</code> after changing conventions or production server config.</p>
          <p>4. Run <code>npm run build</code> before commit or deploy.</p>
          <p>5. Run <code>npm start</code> to smoke-test production mode locally.</p>
        </div>
      </article>
    </section>
  `
};

export default page;
