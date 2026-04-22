import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const layers = [
  ["Boundary", "allowedHosts, trustedProxy, origin checks, CORS"],
  ["Request safety", "timeouts, body limits, safe JSON parsing, rate limits"],
  ["Browser safety", "CSP, security headers, secure cookies, CSRF"],
  ["Access control", "requireAuth, requireRole, custom middleware"],
  ["Evidence", "audit hooks, request IDs, logs, doctor checks"]
] as const;

const helperGroups = [
  ["Response helpers", "json(), html(), redirect(), forbidden(), unauthorized(), badRequest(), notFound(), methodNotAllowed()"],
  ["Auth helpers", "requireAuth(), requireRole(), createAuthGuardMiddleware()"],
  ["Middleware helpers", "withCors(), withRateLimit(), withRequestTimeout(), withBodyLimit(), withJsonBody()"],
  ["Header helpers", "withSecurityHeaders(), withCsp(), createCspHeader(), withRequestId(), withCacheControl()"],
  ["Cookie helpers", "createCookieHeader(), createSecureCookieHeader(), setCookie(), setSecureCookie(), deleteCookie()"],
  ["CSRF helpers", "createCsrfToken(), createCsrfCookie(), withCsrf()"]
] as const;

const auditEvents = [
  "security.host.denied",
  "security.auth.denied",
  "security.role.denied",
  "security.rate_limit.exceeded",
  "security.request.timeout.response",
  "security.body_limit.exceeded",
  "security.json_body.rejected",
  "security.csrf.denied",
  "security.origin.denied"
] as const;

const baselineExample = `import {
  composeMiddlewares,
  createLitoServer,
  withBodyLimit,
  withCsrf,
  withCsp,
  withJsonBody,
  withOriginCheck,
  withRateLimit,
  withRequestId,
  withRequestTimeout,
  withSecurityHeaders
} from "@litoho/server";

export default createLitoServer({
  appName: "Acme App",
  allowedHosts: ["app.example.com"],
  trustedProxy: { hops: 1 },
  audit: {
    onEvent(event, context) {
      console.log("[audit]", event.type, event.severity, event.pathname, context?.requestId);
    }
  },
  middlewares: [
    composeMiddlewares(
      withRequestId(),
      withRequestTimeout({ timeoutMs: 10_000 }),
      withRateLimit({ limit: 120, windowMs: 60_000 }),
      withBodyLimit({ maxBytes: 1_048_576 }),
      withJsonBody(),
      withOriginCheck(),
      withCsrf(),
      withSecurityHeaders(),
      withCsp({
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
          imgSrc: ["'self'", "data:"],
          connectSrc: ["'self'"]
        }
      })
    )
  ]
});`;

const devProdExample = `const isProduction = process.env.NODE_ENV === "production";
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const siteHost = new URL(siteUrl).host;

createLitoServer({
  allowedHosts: isProduction
    ? [siteHost, "www.example.com"]
    : ["localhost", "localhost:3000", "127.0.0.1", "127.0.0.1:3000"],
  trustedProxy: isProduction ? { hops: 1 } : undefined
});`;

const originCsrfExample = `composeMiddlewares(
  withOriginCheck({
    allowedOrigins: ["https://app.example.com"],
    protectedMethods: ["POST", "PUT", "PATCH", "DELETE"]
  }),
  withCsrf({
    cookieName: "acme.csrf",
    headerName: "x-csrf-token",
    tokenSources: ["header", "form"],
    rotateOnMutation: true
  })
);`;

const jsonBodyExample = `import { defineApiRoute, readJsonBody } from "@litoho/server";

export default defineApiRoute({
  post: (context) => {
    const body = readJsonBody<{ name?: string }>(context);

    if (!body?.name) {
      return Response.json({ ok: false, error: "name is required" }, { status: 400 });
    }

    return Response.json({ ok: true, name: body.name });
  }
});`;

const rateLimitStoreExample = `import { withRateLimit } from "@litoho/server";

withRateLimit({
  limit: 100,
  windowMs: 60_000,
  key: (context) => context.clientIp ?? "anonymous",
  store: {
    async increment(key, { now, windowMs }) {
      // Redis example shape:
      // const count = await redis.incr(key);
      // if (count === 1) await redis.pexpire(key, windowMs);
      return {
        count: 1,
        resetAt: now + windowMs
      };
    },
    async reset(key) {
      // await redis.del(key);
    }
  }
});`;

const cookieExample = `import {
  deleteCookie,
  setSecureCookie
} from "@litoho/server";

const response = Response.json({ ok: true });

setSecureCookie(response, "session", token, {
  path: "/",
  maxAge: 60 * 60 * 24,
  sameSite: "Lax"
});

deleteCookie(response, "session", {
  path: "/"
});`;

const accessExample = `import {
  composeMiddlewares,
  requireAuth,
  requireRole,
  unauthorized,
  forbidden
} from "@litoho/server";

export default composeMiddlewares(
  requireAuth({
    protectedPathPrefixes: ["/admin", "/api/admin"],
    unauthorizedResponse: unauthorized("Sign in required")
  }),
  requireRole({
    protectedPathPrefixes: ["/admin", "/api/admin"],
    requiredRoles: ["admin"],
    forbiddenResponse: forbidden("Admin role required")
  })
);`;

const doctorExample = `npm exec litoho -- doctor --root .

# Security doctor checks for:
# allowedHosts, trustedProxy, withOriginCheck, withCsrf
# withRateLimit, withRequestTimeout, withBodyLimit, withJsonBody
# CSP/security headers, and audit hooks`;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Security",
    "Harden Litoho apps with host allowlists, trusted proxy config, origin checks, CSRF, body limits, safe JSON parsing, timeouts, rate limit stores, CSP, secure cookies, access guards, and audit hooks.",
    "/docs/security"
  ),
  render: () => html`
    ${renderDocHero(
      "Security Hardening",
      "Litoho gives you security primitives at the server boundary: reject suspicious requests early, constrain browser capabilities, protect mutations, and emit audit evidence for the decisions your app makes."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Security model</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Defend in layers, not in one handler</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Security middleware should run before route handlers so invalid hosts, oversized bodies, bad JSON, failed
          origin checks, CSRF failures, and rate-limited requests never reach business logic.
        </p>
        <div class="mt-5 grid gap-3 md:grid-cols-2">
          ${layers.map(
            ([name, tools]) => html`
              <div class="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p class="text-sm font-semibold text-white">${name}</p>
                <p class="mt-2 text-sm leading-6 text-slate-400">${tools}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Production server baseline</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          This is a practical starting stack. Put cheap boundary checks first, then body parsing and mutation protection,
          then response headers. Adjust limits per app instead of copying numbers blindly.
        </p>
        ${renderCodeBlock(baselineExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Host allowlist and trusted proxy</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>allowedHosts</code> rejects requests for unexpected hostnames. <code>trustedProxy</code> tells Litoho when
          it may trust forwarded host, protocol, and client IP headers. Only enable trusted proxy behind infrastructure
          you control.
        </p>
        ${renderCodeBlock(devProdExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Origin checks and CSRF</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Use origin checks to reject cross-site mutation attempts and CSRF tokens to prove the browser received a token
          from your own app before submitting a write request. Together, they cover different failure modes.
        </p>
        ${renderCodeBlock(originCsrfExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Body limits and safe JSON parsing</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>withBodyLimit</code> rejects oversized mutation requests, including chunked bodies. <code>withJsonBody</code>
          validates content type, enforces a size limit, parses JSON once, preserves the downstream request body, and
          stores parsed data in request locals.
        </p>
        ${renderCodeBlock(jsonBodyExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Rate limit store adapters</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          The memory store is useful for local development or a single server process. In multi-instance production,
          pass a store backed by Redis, KV, or your platform storage so every instance shares the same counters.
        </p>
        ${renderCodeBlock(rateLimitStoreExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">CSP and response security headers</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>withSecurityHeaders()</code> applies common defensive headers. <code>withCsp()</code> builds a Content
          Security Policy and supports report-only mode while tuning a policy. Start strict, then add only the sources
          your app needs.
        </p>
        ${renderCodeBlock(`withSecurityHeaders();

withCsp({
  reportOnly: false,
  directives: {
    defaultSrc: ["'self'"],
    baseUri: ["'self'"],
    objectSrc: ["'none'"],
    frameAncestors: ["'none'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'"]
  }
});`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Secure cookies</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Cookie helpers encode names and values, sanitize attributes, and make secure session cookies default to
          <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite=Lax</code>. Use plain cookies only when the
          browser must read the value, such as a CSRF token cookie.
        </p>
        ${renderCodeBlock(cookieExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Auth, role guards, CORS, and cache control</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Litoho includes higher-level middleware for common access-control shapes. These helpers are intentionally
          small; real apps can replace token lookup with database or provider-backed auth while keeping the middleware
          contract.
        </p>
        ${renderCodeBlock(accessExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Helper inventory</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          These are the framework helpers you can compose today. Prefer them over repeating ad-hoc response and
          middleware code across routes.
        </p>
        <div class="mt-5 grid gap-3">
          ${helperGroups.map(
            ([name, helpers]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:grid-cols-[12rem_1fr]">
                <p class="text-sm font-semibold text-white">${name}</p>
                <p class="text-sm leading-6 text-slate-400">${helpers}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Audit hooks</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Built-in security middleware emits structured audit events. Send them to logs, queues, metrics, or SIEM tools
          in production. Avoid logging raw secrets, tokens, or full request bodies.
        </p>
        <div class="mt-5 grid gap-2 md:grid-cols-2">
          ${auditEvents.map((event) => html`<code class="rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-sm text-amber-100">${event}</code>`)}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Security doctor</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>litoho doctor</code> scans <code>server.ts</code> and <code>app/api/_middleware.ts</code> for high-priority
          production hardening. It is not a pentest, but it catches the common missing pieces before release.
        </p>
        ${renderCodeBlock(doctorExample)}
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Production checklist</h2>
        <div class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
          <p>1. Set <code>allowedHosts</code> for every production hostname.</p>
          <p>2. Enable <code>trustedProxy</code> only when deployed behind a known proxy/load balancer.</p>
          <p>3. Put <code>withRequestTimeout</code>, <code>withRateLimit</code>, <code>withBodyLimit</code>, and <code>withJsonBody</code> before route handlers.</p>
          <p>4. Protect mutations with <code>withOriginCheck</code> and <code>withCsrf</code>.</p>
          <p>5. Add <code>withSecurityHeaders</code> and tune <code>withCsp</code> in report-only mode before enforcing.</p>
          <p>6. Use secure cookie helpers for session cookies and rotate/delete cookies deliberately.</p>
          <p>7. Send audit events and request IDs to your production logging stack.</p>
          <p>8. Run <code>litoho doctor</code>, <code>npm run build</code>, and a production smoke test before shipping.</p>
        </div>
      </article>
    </section>
  `
};

export default page;
