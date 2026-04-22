import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const contextFields = [
  ["request", "The Web Request object. Middleware may replace it when parsing body or adding an AbortSignal."],
  ["pathname", "Current pathname without query string."],
  ["params", "Dynamic route params from [param] segments."],
  ["url", "Full URL object."],
  ["query", "URLSearchParams for raw query access."],
  ["headers", "Request headers."],
  ["cookies / getCookie()", "Parsed cookie map and helper for reading one cookie."],
  ["locals / setLocal() / getLocal()", "Per-request storage shared across middleware, loaders, APIs, and render."],
  ["env", "Server environment values passed into the Litoho server."],
  ["timing", "Request timing object with startedAt, endedAt, and durationMs."],
  ["clientIp / host / protocol / proxy", "Resolved network metadata, affected by trustedProxy config."],
  ["audit()", "Emit structured audit events from middleware or handlers."]
] as const;

const whereContextAppears = [
  ["Page load()", "Fetch server data before render and return page data."],
  ["Page document()", "Build title, meta, links, and styles from loaded data and request context."],
  ["Page render()", "Render SSR HTML with data, actionData, layoutData, params, query, locals, and env."],
  ["Layout load()", "Load shared data before child pages and pass it through layoutData."],
  ["Layout render()", "Wrap child output and read layout data."],
  ["API handlers", "Read params, query, queryData, JSON locals, cookies, env, and return Response."],
  ["Middleware", "Read/modify request context, set locals, short-circuit with Response, or call next()."],
  ["Special pages", "_not-found.ts and _error.ts receive context for custom fallback rendering."]
] as const;

const pageContextExample = `import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";

type ProductData = {
  id: string;
  q: string | null;
  requestId: string;
};

const page: LitoPageModule<ProductData> = {
  load: ({ params, query, getLocal }) => ({
    id: params.id,
    q: query.get("q"),
    requestId: getLocal<string>("requestId") ?? "missing"
  }),
  document: ({ data }) => ({
    title: \`Product \${data.id}\`,
    meta: [
      { name: "description", content: \`Product \${data.id} detail page.\` }
    ]
  }),
  render: ({ data, pathname }) => html\`
    <h1>Product \${data.id}</h1>
    <p>Path: \${pathname}</p>
    <p>Search query: \${data.q ?? "none"}</p>
    <p>Request ID: \${data.requestId}</p>
  \`
};

export default page;`;

const layoutContextExample = `import { html } from "lit";
import type { LitoLayoutModule } from "@litoho/app";

type DocsData = {
  section: string;
  source: string;
};

const layout: LitoLayoutModule<DocsData> = {
  load: ({ query, layoutData }) => ({
    section: "Docs",
    source: query.get("source") ?? "direct"
  }),
  render: ({ children, data, layoutData }) => html\`
    <aside>\${data.section} / \${data.source}</aside>
    <main>\${children}</main>
  \`
};

export default layout;`;

const middlewareContextExample = `import type { LitoMiddleware } from "@litoho/server";

const requestMeta: LitoMiddleware = async (context, next) => {
  context.setLocal("requestId", crypto.randomUUID());
  context.setLocal("requestedAt", new Date(context.timing.startedAt).toISOString());

  await context.audit({
    type: "app.request.seen",
    severity: "info",
    message: "Request entered app middleware."
  });

  const response = await next();

  if (response) {
    response.headers.set("x-request-id", context.getLocal<string>("requestId") ?? "missing");
  }

  return response;
};

export default requestMeta;`;

const apiContextExample = `import { defineApiRoute, readJsonBody } from "@litoho/server";

type Params = {
  id: string;
};

const route = defineApiRoute<Params, { q: "string"; page: "number" }>({
  query: {
    q: "string",
    page: "number"
  },
  post: (context) => {
    const body = readJsonBody<{ name?: string }>(context);

    return Response.json({
      id: context.params.id,
      q: context.queryData.q,
      page: context.queryData.page,
      body,
      requestId: context.getLocal("requestId")
    });
  }
});

export default route;`;

const localsFlowExample = `app/api/_middleware.ts
  -> context.setLocal("requestId", "req_123")
  -> next()

app/pages/products/[id]/_index.ts load()
  -> context.getLocal("requestId")
  -> returns it as page data

app/pages/products/[id]/_index.ts render()
  -> receives data.requestId
  -> renders it into SSR HTML`;

const trustedProxyExample = `createLitoServer({
  allowedHosts: ["app.example.com"],
  trustedProxy: {
    hops: 1,
    headers: {
      for: "x-forwarded-for",
      host: "x-forwarded-host",
      proto: "x-forwarded-proto"
    }
  }
});

// Then context.clientIp, context.host, context.protocol,
// and context.proxy reflect trusted forwarded headers.`;

const actionExample = `import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";

type PageData = {
  message: string;
};

type ActionData = {
  submitted: boolean;
};

const page: LitoPageModule<PageData, ActionData> = {
  load: () => ({
    message: "Server-rendered form"
  }),
  action: async ({ request }) => {
    if (request.method !== "POST") {
      return { submitted: false };
    }

    return { submitted: true };
  },
  render: ({ data, actionData }) => html\`
    <h1>\${data.message}</h1>
    \${actionData?.submitted ? html\`<p>Thanks for submitting.</p>\` : html\`\`}
    <form method="post">
      <button type="submit">Submit</button>
    </form>
  \`
};

export default page;`;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Context",
    "Understand Litoho request context across pages, layouts, API handlers, middleware, locals, cookies, env, timing, trusted proxy metadata, actions, and audit events.",
    "/docs/context"
  ),
  render: () => html`
    ${renderDocHero(
      "Context",
      "Context is the object Litoho passes through server rendering, API handlers, middleware, layouts, special pages, and actions. It is the safe place to read request state and pass request-scoped data across the stack."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Core idea</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Context is per-request, not global state</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Use context for request data: params, query, cookies, headers, locals, env, timing, and audit. Use
          <code>@litoho/core</code> state for browser interactivity. Do not store user-specific request data in module
          globals.
        </p>
        ${renderCodeBlock(localsFlowExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Context fields</h2>
        <div class="mt-5 grid gap-3">
          ${contextFields.map(
            ([name, description]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:grid-cols-[15rem_1fr]">
                <code class="text-sm text-amber-200">${name}</code>
                <p class="text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Where context appears</h2>
        <div class="mt-5 grid gap-3 md:grid-cols-2">
          ${whereContextAppears.map(
            ([name, description]) => html`
              <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p class="text-sm font-semibold text-white">${name}</p>
                <p class="mt-2 text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Page context</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Page modules receive context in <code>load()</code>, <code>document()</code>, <code>action()</code>, and
          <code>render()</code>. Loader output becomes <code>data</code>, action output becomes <code>actionData</code>.
        </p>
        ${renderCodeBlock(pageContextExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Layout context and layoutData</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Layout loaders run from parent to child. Their return values are stored in <code>layoutData</code> by layout key
          and passed to child layouts and pages.
        </p>
        ${renderCodeBlock(layoutContextExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Middleware context and locals</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Middleware can set request-scoped locals, emit audit events, mutate the request object, decorate responses, or
          short-circuit by returning a <code>Response</code>.
        </p>
        ${renderCodeBlock(middlewareContextExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">API context</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>defineApiRoute()</code> lets API handlers type params and query data. Middleware locals are available in
          API handlers through <code>getLocal()</code>.
        </p>
        ${renderCodeBlock(apiContextExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Actions and actionData</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Page <code>action()</code> is useful for request mutations around forms or POST handling. Its return value is
          passed to <code>document()</code> and <code>render()</code> as <code>actionData</code>.
        </p>
        ${renderCodeBlock(actionExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Trusted proxy context</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>clientIp</code>, <code>host</code>, <code>protocol</code>, and <code>proxy</code> only reflect forwarded
          headers when <code>trustedProxy</code> is enabled. This protects apps from trusting spoofed headers on raw
          public traffic.
        </p>
        ${renderCodeBlock(trustedProxyExample)}
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Context checklist</h2>
        <div class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
          <p>1. Use <code>params</code> for route segments and <code>query</code> for raw query strings.</p>
          <p>2. Use <code>queryData</code> in typed API routes created with <code>defineApiRoute()</code>.</p>
          <p>3. Use <code>locals</code> for per-request data, not module globals.</p>
          <p>4. Use <code>getCookie()</code> for request cookies and server helpers to set response cookies.</p>
          <p>5. Use <code>env</code> for server-only runtime config.</p>
          <p>6. Use <code>audit()</code> for security-relevant or operational events.</p>
          <p>7. Enable <code>trustedProxy</code> only behind infrastructure you control.</p>
        </div>
      </article>
    </section>
  `
};

export default page;
