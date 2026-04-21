import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const routeExamples = [
  ["app/pages/_index.ts", "/"],
  ["app/pages/docs/_index.ts", "/docs"],
  ["app/pages/docs/routing/_index.ts", "/docs/routing"],
  ["app/pages/products/[id]/_index.ts", "/products/:id"],
  ["app/pages/products/[id]/reviews/[reviewId]/_index.ts", "/products/:id/reviews/:reviewId"]
] as const;

const specialFiles = [
  ["_index.ts", "The only page file that creates a URL."],
  ["_layout.ts", "Wraps child routes and can load shared layout data."],
  ["_not-found.ts", "Custom 404 page for unmatched page routes."],
  ["_error.ts", "Custom 500 page for SSR or load failures."],
  ["app/api/_middleware.ts", "App-level API/page middleware loaded by convention."]
] as const;

const apiExamples = [
  ["app/api/health.ts", "/api/health"],
  ["app/api/products.ts", "/api/products"],
  ["app/api/products/[id].ts", "/api/products/:id"],
  ["app/api/users/[id]/[postId].ts", "/api/users/:id/:postId"]
] as const;

const pageModuleExample = `import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";

type ProductData = {
  id: string;
};

const page: LitoPageModule<ProductData> = {
  document: ({ data }) => ({
    title: \`Product \${data.id} | Litoho\`,
    meta: [
      { name: "description", content: \`Read product \${data.id}.\` }
    ]
  }),
  load: ({ params }) => ({
    id: params.id
  }),
  render: ({ data }) => html\`
    <h1>Product \${data.id}</h1>
  \`
};

export default page;`;

const layoutExample = `import { html } from "lit";
import type { LitoLayoutModule } from "@litoho/app";

type DocsLayoutData = {
  section: string;
};

const layout: LitoLayoutModule<DocsLayoutData> = {
  load: () => ({
    section: "Documentation"
  }),
  document: ({ data }) => ({
    title: \`\${data.section} | Litoho\`
  }),
  render: ({ children, data }) => html\`
    <aside>\${data.section}</aside>
    <main>\${children}</main>
  \`
};

export default layout;`;

const clientDirectiveExample = `"use client";

import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";

const page: LitoPageModule = {
  render: () => html\`
    <counter-widget></counter-widget>
  \`
};

export default page;`;

const apiRouteExample = `import { defineApiRoute } from "@litoho/server";

type Params = {
  id: string;
};

type Query = {
  q?: string;
};

export default defineApiRoute<Params, Query>({
  get: ({ params, query }) =>
    Response.json({
      id: params.id,
      search: query.q ?? null
    })
});`;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Routing",
    "Understand Litoho file-based routing, folder-only page conventions, nested layouts, route manifests, API routes, and CLI generators.",
    "/docs/routing"
  ),
  render: () => html`
    ${renderDocHero(
      "File-based Routing",
      "Litoho turns folders into pages, APIs, layouts, and generated manifests. The model is intentionally strict: routes stay explicit, URLs map to ownership, and invalid page filenames fail early."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Core rule</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Only folders create page ownership</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          A routeable page must end in <code>_index.ts</code>. Files like <code>app/pages/dashboard.ts</code> or
          <code>app/pages/index.ts</code> are rejected by <code>litoho generate routes</code> and reported by
          <code>litoho doctor</code>. This keeps the tree consistent with nested layouts and dynamic segments.
        </p>
        ${renderCodeBlock(`app/pages/_index.ts              -> valid, renders /
app/pages/dashboard/_index.ts    -> valid, renders /dashboard
app/pages/dashboard.ts           -> invalid, move to app/pages/dashboard/_index.ts
app/pages/index.ts               -> invalid, move to app/pages/_index.ts`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Route map examples</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho converts each folder segment into a URL segment. Bracket folders become params and are exposed through
          <code>context.params</code> in page loaders, page renders, and API handlers.
        </p>
        <div class="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10">
          ${routeExamples.map(
            ([file, route]) => html`
              <div class="grid gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3 text-sm last:border-b-0 sm:grid-cols-[1.45fr_0.55fr]">
                <code class="text-slate-200">${file}</code>
                <code class="text-amber-200">${route}</code>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Special files</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          These names are reserved by the route scanner. Anything else inside <code>app/pages</code> is treated as a
          mistake so route generation can fail before production.
        </p>
        <div class="mt-5 grid gap-3 md:grid-cols-2">
          ${specialFiles.map(
            ([name, description]) => html`
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <code class="text-sm text-amber-200">${name}</code>
                <p class="mt-2 text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Page module contract</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          A page exports a <code>LitoPageModule</code>. The common fields are <code>load</code> for server data,
          <code>document</code> for title/meta/link output, <code>action</code> for request mutations, optional
          <code>cache</code>, and <code>render</code> for the Lit template.
        </p>
        ${renderCodeBlock(pageModuleExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Nested layouts and layout data</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Layouts are collected from the root down to the page folder. Each layout can load data, contribute document
          metadata, and wrap the child output. Page loaders receive accumulated <code>layoutData</code>, so shared data
          can be loaded once near the route boundary that owns it.
        </p>
        ${renderCodeBlock(`app/pages/_layout.ts
  -> wraps every page

app/pages/docs/_layout.ts
  -> wraps /docs and every route below /docs

app/pages/docs/routing/_index.ts
  -> renders first, then is wrapped by docs layout, then root layout`)}
        ${renderCodeBlock(layoutExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Server routes and client routes</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Routes are server-rendered by default. Add a top-of-file directive when a page should be handled as a client
          route. The directive must be the first statement after comments or whitespace.
        </p>
        ${renderCodeBlock(`"use server"; // default-style SSR route, explicit when you want to document intent
"use client"; // client-only route for interactive islands or browser-only components`)}
        <p class="mt-4 text-sm leading-7 text-slate-400">
          Use <code>"use client"</code> for routes that depend on browser APIs, custom element interaction, or stateful
          client widgets that should not render on the server.
        </p>
        ${renderCodeBlock(clientDirectiveExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">API route mapping</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Files under <code>app/api</code> become endpoints under <code>/api</code>. Dynamic file or folder segments use
          the same bracket convention as pages. The special <code>app/api/_middleware.ts</code> file is excluded from
          the API manifest and loaded as middleware instead.
        </p>
        <div class="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10">
          ${apiExamples.map(
            ([file, route]) => html`
              <div class="grid gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3 text-sm last:border-b-0 sm:grid-cols-[1.35fr_0.65fr]">
                <code class="text-slate-200">${file}</code>
                <code class="text-sky-200">${route}</code>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Typed params and query in APIs</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Use <code>defineApiRoute</code> when you want route params and query values to be typed. API modules can be
          exported as a default route module or as named HTTP method exports, but <code>defineApiRoute</code> is the
          clearest option for larger apps.
        </p>
        ${renderCodeBlock(apiRouteExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Generated manifests</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho writes route metadata into <code>src/generated/page-manifest.ts</code> and
          <code>src/generated/api-manifest.ts</code>. The server imports those manifests instead of walking your file
          system at request time.
        </p>
        ${renderCodeBlock(`src/generated/page-manifest.ts
  -> page import loaders, routePath, routeId, layout chain, and route mode

src/generated/api-manifest.ts
  -> API module import list

npm run generate:routes
  -> manual manifest regeneration`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">CLI generators</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Prefer the CLI when adding routes. It keeps filenames aligned with the convention and reduces drift between
          pages, APIs, layouts, components, and middleware stacks.
        </p>
        ${renderCodeBlock(`litoho g p docs/reference
litoho g p products --params id
litoho g l docs
litoho g a products --params id --query q:string
litoho g ms secure-api --force
litoho generate routes
litoho doctor`)}
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Routing checklist</h2>
        <div class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
          <p>1. Put every page at <code>app/pages/**/_index.ts</code>.</p>
          <p>2. Use <code>[param]</code> folders for dynamic pages and API params.</p>
          <p>3. Use <code>_layout.ts</code> for shared shells, shared data, and document defaults.</p>
          <p>4. Keep custom error pages at <code>app/pages/_not-found.ts</code> and <code>app/pages/_error.ts</code>.</p>
          <p>5. Regenerate manifests after moving route files, or let <code>litoho dev</code> watch them for you.</p>
          <p>6. Run <code>litoho doctor</code> before publishing to catch legacy filenames and missing conventions.</p>
        </div>
      </article>
    </section>
  `
};

export default page;
