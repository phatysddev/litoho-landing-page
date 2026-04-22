import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const primitives = [
  ["signal()", "Writable reactive value with .value, get(), set(), update(), and subscribe()."],
  ["memo()", "Readonly derived value that recalculates when the signals it reads change."],
  ["watch()", "Runs side effects and reruns when tracked signals or explicit dependencies change."],
  ["batch()", "Groups multiple signal updates and notifies subscribers once after the batch."],
  ["store()", "Small object store with whole-state and per-field subscriptions."],
  ["LitoElement", "LitElement base class that auto-rerenders when signals are read in render()."],
  ["delegateEvents()", "Event delegation helper for DOM rendered from templates or imperative markup."],
  ["isClient / isServer", "Runtime helpers for browser-only or server-only logic."]
] as const;

const counterComponentExample = `"use client";

import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import "../../../src/components/counter-panel.ts";

const page: LitoPageModule = {
  document: {
    title: "Counter"
  },
  render: () => html\`
    <app-counter-panel></app-counter-panel>
  \`
};

export default page;`;

const litoElementExample = `import { css, html } from "lit";
import {
  LitoElement,
  batch,
  defineComponent,
  memo,
  signal,
  watch
} from "@litoho/core";

const count = signal(0);
const doubled = memo(() => count.value * 2);
const status = memo(() => count.value >= 10 ? "hot" : "calm");

watch(() => {
  console.log("count changed", count.value, doubled.value);
}, [count, doubled], { target: "client" });

export class CounterPanel extends LitoElement {
  static styles = css\`
    :host {
      display: block;
    }
  \`;

  render() {
    return html\`
      <section>
        <p>Count: \${count.value}</p>
        <p>Doubled: \${doubled.value}</p>
        <p>Status: \${status.value}</p>
        <button @click=\${() => count.update((value) => value + 1)}>+1</button>
        <button
          @click=\${() =>
            batch(() => {
              count.update((value) => value + 1);
              count.update((value) => value + 1);
            })}
        >
          +2 batched
        </button>
      </section>
    \`;
  }
}

defineComponent("app-counter-panel", CounterPanel);`;

const storeExample = `import { store, watch } from "@litoho/core";

const session = store({
  user: "guest",
  theme: "dark",
  notifications: 0
});

session.set("user", "Yod");
session.set({
  theme: "light",
  notifications: 3
});

const user = session.get("user");
const state = session.get();

const stopWholeStore = session.subscribe((nextState) => {
  console.log("state changed", nextState);
});

const stopTheme = session.subscribe("theme", (theme) => {
  console.log("theme changed", theme);
});

watch(() => {
  console.log("current user", session.get("user"));
}, { target: "client" });`;

const watchExample = `import { signal, watch } from "@litoho/core";

const query = signal("");
const page = signal(1);

// Auto-tracked: dependencies are discovered from reads inside the callback.
const stopAuto = watch(() => {
  console.log(query.value, page.value);
}, { target: "client" });

// Explicit dependencies: React-like mental model.
const stopExplicit = watch(() => {
  console.log("query/page changed");
}, [query, page], { target: "client" });

// Cleanup support.
const stopInterval = watch(() => {
  const id = window.setInterval(() => console.log(query.value), 1000);
  return () => window.clearInterval(id);
}, [query], { target: "client" });`;

const eventDelegationExample = `import { delegateEvents } from "@litoho/core";

const dispose = delegateEvents(this.renderRoot, {
  click: {
    "[data-action='increment']": () => count.update((value) => value + 1),
    "[data-action='reset']": () => count.set(0)
  }
});

// Later:
dispose();`;

const runtimeExample = `import { isClient, isServer, onClient, onServer } from "@litoho/core";

onServer(() => {
  console.log("runs only while rendering on the server");
});

onClient(() => {
  window.localStorage.setItem("visited", "true");
});

if (isClient) {
  // browser-only work
}

if (isServer) {
  // server-only work
}`;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho State",
    "Use Litoho core state primitives: signal, memo, watch, batch, store, LitoElement, delegateEvents, and runtime guards for client-side interactivity.",
    "/docs/state"
  ),
  render: () => html`
    ${renderDocHero(
      "State",
      "Litoho state is intentionally small: signals for values, memos for derived values, watches for side effects, stores for object state, and LitoElement for automatic Lit rerenders."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Mental model</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">State is client-first</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Use server <code>load()</code> for data that should exist in SSR HTML. Use <code>signal()</code>,
          <code>memo()</code>, <code>watch()</code>, and <code>store()</code> for interactive browser state after the page
          hydrates. If a route is mostly interactive, mark it with <code>"use client";</code>.
        </p>
        ${renderCodeBlock(counterComponentExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Core primitives</h2>
        <div class="mt-5 grid gap-3 md:grid-cols-2">
          ${primitives.map(
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
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Reactive component with LitoElement</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>LitoElement</code> includes a reactive mixin. When a signal or memo is read inside <code>render()</code>,
          the element subscribes and calls <code>requestUpdate()</code> when the value changes.
        </p>
        ${renderCodeBlock(litoElementExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">watch() patterns</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>watch()</code> supports auto-tracking and explicit dependency arrays. Use <code>{ target: "client" }</code>
          for browser-only effects such as timers, storage, analytics, or DOM APIs.
        </p>
        ${renderCodeBlock(watchExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">store() for object state</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Use <code>store()</code> when several values belong together. You can read or subscribe to the whole state, or
          target a single field to keep updates focused.
        </p>
        ${renderCodeBlock(storeExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Event delegation helper</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Lit's <code>@click</code> syntax is usually enough. Use <code>delegateEvents()</code> when you intentionally want
          one listener on a root element that handles several selectors.
        </p>
        ${renderCodeBlock(eventDelegationExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Runtime guards</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Keep browser APIs out of SSR paths with <code>isClient</code>, <code>isServer</code>, <code>onClient()</code>,
          and <code>onServer()</code>. This is especially useful inside shared components.
        </p>
        ${renderCodeBlock(runtimeExample)}
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">State checklist</h2>
        <div class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
          <p>1. Use <code>load()</code> for SSR data and <code>signal()</code> for browser interaction.</p>
          <p>2. Read signals in <code>LitoElement.render()</code> for automatic rerenders.</p>
          <p>3. Use <code>memo()</code> for derived values instead of duplicating state.</p>
          <p>4. Use explicit <code>watch(fn, [deps])</code> when you want React-like dependency clarity.</p>
          <p>5. Use <code>batch()</code> when multiple updates belong to one interaction.</p>
          <p>6. Use <code>store()</code> for shared object state, but keep server data in route loaders.</p>
        </div>
      </article>
    </section>
  `
};

export default page;
