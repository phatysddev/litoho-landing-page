import { html } from "lit";
import type { LitoNotFoundModule } from "@litoho/app";
import { createSeoDocument } from "../../src/docs";

const page: LitoNotFoundModule = {
  document: createSeoDocument(
    "Page not found, Litoho",
    "The requested Litoho documentation page could not be found.",
    "/404"
  ),
  render: () => html`
    <main class="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-4xl flex-col justify-center px-6 py-20 sm:px-8">
      <p class="text-xs uppercase tracking-[0.32em] text-amber-300">404</p>
      <h1 class="mt-5 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-7xl">This route is off the manifest.</h1>
      <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300">
        The page may have moved, or the route was never generated. Start from the docs map and continue from there.
      </p>
      <div class="mt-10 flex flex-wrap gap-3">
        <a class="inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950" href="/docs">
          Browse docs
        </a>
        <a class="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white" href="/">
          Back to framework
        </a>
      </div>
    </main>
  `
};

export default page;
