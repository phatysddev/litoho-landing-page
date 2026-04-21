import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho Security",
    "Harden Litoho apps with host allowlists, trusted proxy config, origin checks, CSRF protection, body limits, timeouts, rate limit stores, CSP, secure cookies, and audit hooks.",
    "/docs/security"
  ),
  render: () => html`
    ${renderDocHero(
      "Security Hardening",
      "Litoho ships production-focused middleware for the parts of web security that should not be hand-rolled in every app."
    )}

    <section class="mb-8 grid gap-4 lg:grid-cols-3">
      <article class="border-t border-amber-300/40 pt-5">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-300">Boundary</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Know the real host and client.</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Use host allowlists and trusted proxy settings so forwarded headers only count when the app is actually behind
          infrastructure you control.
        </p>
      </article>
      <article class="border-t border-sky-300/30 pt-5">
        <p class="text-xs uppercase tracking-[0.28em] text-sky-300">Mutation</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Protect writes before handlers run.</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Origin checks, CSRF tokens, JSON parsing, body limits, rate limits, and request timeouts belong near the front
          of the middleware stack.
        </p>
      </article>
      <article class="border-t border-emerald-300/30 pt-5">
        <p class="text-xs uppercase tracking-[0.28em] text-emerald-300">Evidence</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Emit audit events for security decisions.</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Audit hooks capture rejected hosts, auth failures, rate limits, CSRF failures, origin rejects, body rejects,
          JSON rejects, and timeouts.
        </p>
      </article>
    </section>

    <section class="grid gap-6">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Production server baseline</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Start with a clear server boundary. Do not trust forwarded headers unless the request first passes through a
          proxy you operate.
        </p>
        ${renderCodeBlock(`import {
  composeMiddlewares,
  createLitoServer,
  withBodyLimit,
  withCsrf,
  withCsp,
  withJsonBody,
  withOriginCheck,
  withRateLimit,
  withRequestTimeout
} from "@litoho/server";

export default createLitoServer({
  allowedHosts: ["app.example.com"],
  trustedProxy: { hops: 1 },
  audit: {
    onEvent(event) {
      console.log("[audit]", event.type, event.severity, event.pathname);
    }
  },
  middlewares: [
    withRequestTimeout({ timeoutMs: 10_000 }),
    withRateLimit({ limit: 120, windowMs: 60_000 }),
    withBodyLimit({ maxBytes: 1_048_576 }),
    withJsonBody(),
    withOriginCheck(),
    withCsrf(),
    withCsp({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"]
      }
    })
  ]
});`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Rate limit store adapters</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          The default memory store is useful for one server process. For multiple instances, pass an adapter backed by
          Redis, KV, or your platform store.
        </p>
        ${renderCodeBlock(`withRateLimit({
  limit: 100,
  windowMs: 60_000,
  store: {
    async increment(key, { now, windowMs }) {
      // Redis INCR + EXPIRE or platform KV increment
      return {
        count: 1,
        resetAt: now + windowMs
      };
    }
  }
});`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Secure cookies and CSRF</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Cookie helpers encode values, reject unsafe attributes, and make session cookies default to
          <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite=Lax</code>.
        </p>
        ${renderCodeBlock(`import { setSecureCookie, deleteCookie, withCsrf } from "@litoho/server";

const response = Response.json({ ok: true });
setSecureCookie(response, "session", token, {
  path: "/",
  maxAge: 60 * 60 * 24
});

deleteCookie(response, "session");

withCsrf({
  protectedMethods: ["POST", "PUT", "PATCH", "DELETE"]
});`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Security doctor</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>litoho doctor</code> scans <code>server.ts</code> and <code>app/api/_middleware.ts</code> for missing
          production hardening.
        </p>
        ${renderCodeBlock(`npm exec litoho -- doctor --root .

# Checks for:
# allowedHosts, trustedProxy, withOriginCheck, withCsrf
# withRateLimit, withRequestTimeout, withBodyLimit
# withJsonBody, CSP/security headers, and audit hooks`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Audit event coverage</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Built-in security middleware emits structured events so production apps can write them to logs, SIEM, queues,
          or analytics pipelines.
        </p>
        ${renderCodeBlock(`security.host.denied
security.auth.denied
security.role.denied
security.rate_limit.exceeded
security.request.timeout.response
security.body_limit.exceeded
security.json_body.rejected
security.csrf.denied
security.origin.denied`)}
      </article>
    </section>
  `
};

export default page;
