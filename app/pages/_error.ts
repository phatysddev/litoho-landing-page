import { html } from "lit";
import type { LitoErrorModule } from "@litoho/app";
import { createSeoDocument } from "../../src/docs";

const page: LitoErrorModule = {
  document: ({ status }) =>
    createSeoDocument(
      `Server error ${status}, Litoho`,
      "The Litoho documentation server hit an unexpected error while rendering this page.",
      "/500"
    ),
  render: ({ status }) => html`
    <main class="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-4xl flex-col justify-center px-6 py-20 sm:px-8">
      <p class="text-xs uppercase tracking-[0.32em] text-rose-300">Error ${status}</p>
      <h1 class="mt-5 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-7xl">The docs server tripped a guardrail.</h1>
      <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300">
        This is the custom Litoho error route. Try again, or head back to the documentation index.
      </p>
      <div class="mt-10 flex flex-wrap gap-3">
        <a class="inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950" href="/docs">
          Browse docs
        </a>
        <a class="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white" href="/docs/security">
          Read security docs
        </a>
      </div>
    </main>
  `
};

export default page;
