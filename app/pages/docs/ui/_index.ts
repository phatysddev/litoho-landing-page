import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import "@litoho/ui/badge";
import "@litoho/ui/button";
import "@litoho/ui/card";
import "@litoho/ui/dialog";
import "@litoho/ui/dropdown";
import "@litoho/ui/input";
import "@litoho/ui/tabs";
import { showToast } from "@litoho/ui/toast";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const primitives = [
  ["badge", "lui-badge", "Small status pills for labels, states, tags, and release markers."],
  ["button", "lui-button", "Primary, secondary, outline, ghost, and destructive action buttons."],
  ["card", "lui-card", "Structured surfaces with header, title, description, content, and footer slots."],
  ["dialog", "lui-dialog", "Modal-style overlay primitives for confirmations and focused flows."],
  ["dropdown", "lui-dropdown-menu", "Contextual menus with triggers, content, items, and separators."],
  ["input", "lui-input / lui-textarea", "Text and multiline input primitives for forms."],
  ["select", "lui-select", "Single-choice select primitive with option children."],
  ["tabs", "lui-tabs", "Segmented content navigation with triggers and content panels."],
  ["toast", "lui-toast-region", "Transient feedback region and toast helper support."]
] as const;

const presets = [
  ["form", "input, textarea, select, button"],
  ["overlay", "dialog, dropdown, toast, button"],
  ["content", "card, badge, button"],
  ["navigation", "tabs, dropdown, button"]
] as const;

const selectiveImportExample = `import "@litoho/ui/button";
import "@litoho/ui/card";

export const renderPlan = () => html\`
  <lui-card>
    <lui-card-header>
      <lui-card-title>Starter</lui-card-title>
      <lui-card-description>For small teams shipping quickly.</lui-card-description>
    </lui-card-header>
    <lui-card-content>
      <p>$19 / month</p>
    </lui-card-content>
    <lui-card-footer>
      <lui-button>Choose plan</lui-button>
    </lui-card-footer>
  </lui-card>
\`;`;

const localComponentExample = `import { css, html } from "lit";
import { LitoElement, defineComponent } from "@litoho/core";
import "@litoho/ui/button";
import "@litoho/ui/card";

export class PricingCard extends LitoElement {
  static properties = {
    plan: { type: String },
    price: { type: String }
  };

  static styles = css\`
    :host {
      display: block;
    }
  \`;

  declare plan: string;
  declare price: string;

  constructor() {
    super();
    this.plan = "Starter";
    this.price = "$19";
  }

  render() {
    return html\`
      <lui-card>
        <lui-card-header>
          <lui-card-title>\${this.plan}</lui-card-title>
          <lui-card-description>Everything you need to launch.</lui-card-description>
        </lui-card-header>
        <lui-card-content>\${this.price} / month</lui-card-content>
        <lui-card-footer>
          <lui-button>Choose plan</lui-button>
        </lui-card-footer>
      </lui-card>
    \`;
  }
}

defineComponent("app-pricing-card", PricingCard);`;

const pageUsageExample = `"use client";

import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import "../../../src/components/pricing/card.ts";

const page: LitoPageModule = {
  document: {
    title: "Pricing"
  },
  render: () => html\`
    <app-pricing-card plan="Pro" price="$49"></app-pricing-card>
  \`
};

export default page;`;

const copyWorkflowExample = `litoho ui add overlay --copy
  -> copies dialog, dropdown, toast, and button source into app/components/ui

litoho ui diff overlay
  -> reports up_to_date, outdated, modified, diverged, legacy, missing, or extra

litoho ui upgrade overlay
  -> updates safe outdated files

litoho ui upgrade overlay --force
  -> overwrites local changes intentionally`;

const statefulWidgetExample = `import { css, html } from "lit";
import { LitoElement, defineComponent, memo, signal } from "@litoho/core";

const count = signal(0);
const doubled = memo(() => count.value * 2);

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
        <button @click=\${() => count.update((value) => value + 1)}>Increase</button>
      </section>
    \`;
  }
}

defineComponent("app-counter-panel", CounterPanel);`;

function renderLiveShowcase() {
  return html`
    <article class="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80">
      <div class="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Live showcase</p>
        <div class="mt-4 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 class="text-3xl font-semibold tracking-[-0.055em] text-white">Actual @litoho/ui elements</h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              These are real custom elements rendered on this page, not screenshots. Import a module, use the
              <code>lui-*</code> tag, and compose the primitive inside routes or app-owned components.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <lui-badge>v0.1</lui-badge>
            <lui-badge variant="outline">Selective imports</lui-badge>
            <lui-badge variant="secondary">Lit native</lui-badge>
          </div>
        </div>
      </div>

      <div class="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <lui-card>
            <lui-card-header>
              <lui-card-title>Launch checklist</lui-card-title>
              <lui-card-description>Compose cards, badges, buttons, and form fields without importing the whole UI kit.</lui-card-description>
            </lui-card-header>
            <lui-card-content>
              <div class="grid gap-4">
                <div class="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <label class="text-xs uppercase tracking-[0.22em] text-slate-500">Project name</label>
                  <lui-input placeholder="litoho-dashboard"></lui-input>
                </div>
                <div class="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <label class="text-xs uppercase tracking-[0.22em] text-slate-500">Template</label>
                  <div class="rounded-[0.95rem] border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                    Full-stack CRUD
                    <span class="ml-2 text-xs text-slate-500">select preview</span>
                  </div>
                </div>
              </div>
            </lui-card-content>
            <lui-card-footer>
              <div class="flex flex-wrap gap-3">
                <lui-button>Build app</lui-button>
                <lui-button variant="outline">Preview</lui-button>
              </div>
            </lui-card-footer>
          </lui-card>
        </div>

        <div class="grid gap-6 p-6 sm:p-8">
          <div class="grid gap-3">
            <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Actions</p>
            <div class="flex flex-wrap gap-3">
              <lui-button size="sm">Default</lui-button>
              <lui-button size="sm" variant="secondary">Secondary</lui-button>
              <lui-button size="sm" variant="outline">Outline</lui-button>
              <lui-button size="sm" variant="ghost">Ghost</lui-button>
              <lui-button size="sm" variant="danger">Danger</lui-button>
            </div>
          </div>

          <div class="grid gap-3">
            <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Interactive primitives</p>
            <div class="flex flex-wrap items-center gap-3">
              <lui-dialog>
                <lui-dialog-trigger>
                  <lui-button variant="outline">Open dialog</lui-button>
                </lui-dialog-trigger>
                <lui-dialog-content>
                  <lui-dialog-title>Dialog is live</lui-dialog-title>
                  <lui-dialog-description>
                    This modal is powered by the actual <code>@litoho/ui/dialog</code> module.
                  </lui-dialog-description>
                  <lui-dialog-footer>
                    <lui-dialog-close>
                      <lui-button variant="outline">Close</lui-button>
                    </lui-dialog-close>
                    <lui-dialog-close>
                      <lui-button>Looks good</lui-button>
                    </lui-dialog-close>
                  </lui-dialog-footer>
                </lui-dialog-content>
              </lui-dialog>

              <lui-dropdown-menu>
                <lui-dropdown-trigger>
                  <lui-button variant="secondary">Menu</lui-button>
                </lui-dropdown-trigger>
                <lui-dropdown-content>
                  <lui-dropdown-item>Generate page</lui-dropdown-item>
                  <lui-dropdown-item>Add UI preset</lui-dropdown-item>
                  <lui-dropdown-separator></lui-dropdown-separator>
                  <lui-dropdown-item>Run doctor</lui-dropdown-item>
                </lui-dropdown-content>
              </lui-dropdown-menu>

              <lui-button
                variant="outline"
                @click=${() =>
                  showToast({
                    title: "Toast from @litoho/ui",
                    description: "The toast region is rendered at the bottom-right of this page.",
                    variant: "success"
                  })}
              >
                Show toast
              </lui-button>
              <lui-toast-region></lui-toast-region>
            </div>
          </div>

          <lui-tabs value="imports">
            <lui-tabs-list>
              <lui-tabs-trigger value="imports">Imports</lui-tabs-trigger>
              <lui-tabs-trigger value="copy">Copy</lui-tabs-trigger>
              <lui-tabs-trigger value="compose">Compose</lui-tabs-trigger>
            </lui-tabs-list>
            <lui-tabs-content value="imports">
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
                Import only the primitive modules you use, such as <code>@litoho/ui/button</code> and
                <code>@litoho/ui/card</code>.
              </div>
            </lui-tabs-content>
            <lui-tabs-content value="copy">
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
                Use <code>litoho ui add overlay --copy</code> when you want local source ownership.
              </div>
            </lui-tabs-content>
            <lui-tabs-content value="compose">
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
                Wrap primitives inside <code>src/components</code> to build product-specific sections.
              </div>
            </lui-tabs-content>
          </lui-tabs>
        </div>
      </div>
    </article>
  `;
}

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho UI and Components",
    "Build with selective @litoho/ui imports, local copied primitives, and app-owned Lit components in src/components.",
    "/docs/ui"
  ),
  render: () => html`
    ${renderDocHero(
      "UI and Components",
      "Litoho splits UI into two layers: framework primitives from @litoho/ui and product-owned Lit components in src/components. Import only what you use, then compose bigger app sections close to the routes that need them."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Mental model</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Primitives first, product components second</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Use <code>@litoho/ui</code> for reusable interface primitives like buttons, cards, dialogs, inputs, tabs, and
          toasts. Use <code>src/components</code> for app-specific blocks like hero sections, pricing cards, dashboards,
          product rows, and profile panels.
        </p>
        ${renderCodeBlock(`app/pages/**          -> route modules
app/api/**            -> backend handlers
src/components/**     -> app-owned Lit components
@litoho/ui/*          -> selective shared UI primitives`)}
      </article>

      ${renderLiveShowcase()}

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Available UI primitives</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Each primitive is imported by module path, so adding <code>@litoho/ui/button</code> does not require importing
          every other UI component.
        </p>
        <div class="mt-5 grid gap-3 lg:grid-cols-2">
          ${primitives.map(
            ([module, tag, description]) => html`
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div class="flex flex-wrap items-center gap-2">
                  <code class="text-sm text-amber-200">@litoho/ui/${module}</code>
                  <code class="text-xs text-slate-400">${tag}</code>
                </div>
                <p class="mt-3 text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Selective import usage</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Import the primitive module once in the page, layout, or component that renders it. The import registers the
          custom elements, then you use the <code>lui-*</code> tags directly in Lit templates.
        </p>
        ${renderCodeBlock(selectiveImportExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Install UI with the CLI</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>litoho ui add</code> can either add package imports or copy UI source into your app. If you do not pass
          <code>--file</code>, the CLI targets <code>app/pages/_layout.ts</code>, then <code>app/pages/_index.ts</code>,
          or creates a root layout if needed.
        </p>
        ${renderCodeBlock(`litoho ui list
litoho ui info button
litoho ui add badge button card
litoho ui add form
litoho ui add overlay --copy
litoho add ui dialog --file app/pages/admin/_layout.ts`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Presets</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Presets are shortcuts that expand into several primitives. They are useful when a route needs a complete
          interaction cluster instead of one atom.
        </p>
        <div class="mt-5 grid gap-3 md:grid-cols-2">
          ${presets.map(
            ([name, components]) => html`
              <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <code class="text-sm text-sky-200">${name}</code>
                <p class="mt-2 text-sm leading-6 text-slate-400">${components}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Copy, diff, and upgrade workflow</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Use <code>--copy</code> when you want ownership like shadcn: source files live in your project and can be
          customized. Litoho writes metadata headers so <code>diff</code> and <code>upgrade</code> can tell whether your
          local copy is unchanged, modified, outdated, or diverged.
        </p>
        ${renderCodeBlock(copyWorkflowExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Create app-owned components</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          <code>litoho g c</code> creates Lit components under <code>src/components</code>. Generated components extend
          <code>LitoElement</code>, register with <code>defineComponent()</code>, and use a tag name like
          <code>app-profile-card</code>.
        </p>
        ${renderCodeBlock(`litoho g c hero/banner
litoho g c marketing/pricing-card --tag marketing-pricing-card
litoho g c hero/banner --page landing
litoho g c --page profile/card
litoho g c profile/card --with-ui button,card`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Compose a local component with @litoho/ui</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          This is the recommended pattern for product UI: keep the route module small, move reusable blocks into
          <code>src/components</code>, and use <code>@litoho/ui</code> for the low-level visual primitives.
        </p>
        ${renderCodeBlock(localComponentExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Use components from a page</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          A route only needs to import the component module before using the custom element tag. Use
          <code>"use client"</code> for pages that rely on browser interaction or component state.
        </p>
        ${renderCodeBlock(pageUsageExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Stateful widgets</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Components can use Litoho core state primitives such as <code>signal()</code>, <code>memo()</code>, and
          <code>watch()</code>. Reading a signal in <code>render()</code> subscribes the component to updates.
        </p>
        ${renderCodeBlock(statefulWidgetExample)}
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Recommended workflow</h2>
        <div class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
          <p>1. Build the first screen inside <code>app/pages/**/_index.ts</code>.</p>
          <p>2. Extract repeated or named sections into <code>src/components</code>.</p>
          <p>3. Use <code>@litoho/ui</code> for shared primitives instead of recreating atoms in every feature.</p>
          <p>4. Use <code>litoho g c --page ...</code> when you want the CLI to import and insert usage automatically.</p>
          <p>5. Use <code>litoho ui add --copy</code> only when you intentionally want to own and customize primitive source.</p>
        </div>
      </article>
    </section>
  `
};

export default page;
