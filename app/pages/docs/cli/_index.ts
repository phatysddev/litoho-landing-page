import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho CLI",
    "Use the Litoho CLI to scaffold projects, generate routes, create components, manage UI primitives, and validate project health.",
    "/docs/cli"
  ),
  render: () => html`
    ${renderDocHero(
      "CLI Workflow",
      "Use CLI commands as a daily loop: scaffold, generate, verify, and ship with conventions that remain predictable."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Project commands</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          These commands map directly to the app lifecycle from local development to production start.
        </p>
        ${renderCodeBlock(`npm exec litoho@0.1.2 -- new my-app\nnpm exec litoho -- dev --root .\nnpm exec litoho -- build --root .\nnpm exec litoho -- start --root .`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Generate routes and components</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Favor generators over manual scaffolding to keep names, folders, and route manifests consistent.
        </p>
        ${renderCodeBlock(`litoho g p docs/getting-started\nlitoho g c hero/banner\nlitoho g c profile/card --page docs\nlitoho g c docs/code-example --with-ui card,button`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Daily developer checklist</h2>
        ${renderCodeBlock(`1) litoho g ... (generate page/layout/api/component)
2) npm run dev
3) litoho doctor
4) npm run build
5) npm start`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">UI and verification</h2>
        ${renderCodeBlock(`litoho ui add button card tabs\nlitoho ui diff\nlitoho ui upgrade\nlitoho doctor`)}
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Doctor now includes a security posture scan for <code>server.ts</code> and <code>app/api/_middleware.ts</code>,
          covering host allowlists, trusted proxy use, CSRF, origin checks, rate limits, timeouts, body limits, CSP, and
          audit hooks.
        </p>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/3 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Monorepo release scripts</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          In the main Litoho monorepo, release work is script-driven. Use these to validate, pack, and publish in a
          controlled sequence.
        </p>
        ${renderCodeBlock(`pnpm release:preflight
pnpm release:verify
pnpm release:pack
pnpm release:publish`)}
      </article>
    </section>
  `
};

export default page;
