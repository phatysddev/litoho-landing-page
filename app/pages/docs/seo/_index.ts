import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";
import { createSeoDocument, renderCodeBlock, renderDocHero } from "../../../../src/docs";

const documentFields = [
  ["title", "The final <title>. Page document values override layout document values."],
  ["lang", "The html lang attribute. Defaults to en when omitted."],
  ["meta", "An array of name/property meta tags for descriptions, Open Graph, Twitter cards, and robots."],
  ["links", "An array of link tags such as canonical, icon, preload, and alternate."],
  ["styles", "Route-level style blocks injected into the document head."]
] as const;

const seoChecklist = [
  "One clear H1 that matches the search intent of the page.",
  "A unique title and meta description for every indexable route.",
  "A canonical URL that points to the preferred version of the page.",
  "Open Graph and Twitter card tags for social previews.",
  "Primary page content visible in SSR HTML without waiting for client interaction.",
  "A stable /robots.txt and /sitemap.xml in production.",
  "Public assets such as logo.png available from the public directory.",
  "No accidental noindex on pages that should rank."
] as const;

const routeDocumentExample = `import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";

type ProductData = {
  id: string;
  name: string;
  summary: string;
};

const page: LitoPageModule<ProductData> = {
  load: ({ params }) => ({
    id: params.id,
    name: "Litoho Starter",
    summary: "A lightweight full-stack framework powered by Lit."
  }),
  document: ({ data, pathname }) => {
    const canonicalUrl = \`https://litoho.dev\${pathname}\`;

    return {
      title: \`\${data.name} | Litoho\`,
      meta: [
        { name: "description", content: data.summary },
        { property: "og:title", content: data.name },
        { property: "og:description", content: data.summary },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: "https://litoho.dev/logo.png" },
        { name: "twitter:card", content: "summary_large_image" }
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        { rel: "icon", href: "/logo.png", type: "image/png" }
      ]
    };
  },
  render: ({ data }) => html\`
    <article>
      <h1>\${data.name}</h1>
      <p>\${data.summary}</p>
    </article>
  \`
};

export default page;`;

const layoutDocumentExample = `import { html } from "lit";
import type { LitoLayoutModule } from "@litoho/app";

const layout: LitoLayoutModule = {
  document: {
    lang: "en",
    meta: [
      { property: "og:site_name", content: "Litoho" },
      { name: "theme-color", content: "#020617" }
    ],
    links: [
      { rel: "icon", href: "/logo.png", type: "image/png" }
    ]
  },
  render: ({ children }) => html\`
    <main>\${children}</main>
  \`
};

export default layout;`;

const clientTradeoffExample = `"use client";

import { html } from "lit";
import type { LitoPageModule } from "@litoho/app";

const page: LitoPageModule = {
  document: {
    title: "Interactive demo | Litoho",
    meta: [
      { name: "description", content: "A browser-only interactive demo." }
    ]
  },
  render: () => html\`
    <interactive-demo></interactive-demo>
  \`
};

export default page;`;

const robotsSitemapExample = `const siteUrl = "https://litoho.dev";
const sitemapRoutes = ["/", "/docs", "/docs/routing", "/docs/seo"];

app.get("/robots.txt", (context) => {
  context.header("content-type", "text/plain; charset=utf-8");
  return context.body([
    "User-agent: *",
    "Allow: /",
    "",
    \`Sitemap: \${siteUrl}/sitemap.xml\`
  ].join("\\n"));
});

app.get("/sitemap.xml", (context) => {
  context.header("content-type", "application/xml; charset=utf-8");
  return context.body(\`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${sitemapRoutes.map((pathname) => \`
  <url>
    <loc>\${siteUrl}\${pathname}</loc>
    <changefreq>\${pathname === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>\${pathname === "/" ? "1.0" : "0.8"}</priority>
  </url>\`).join("")}
</urlset>\`);
});`;

const validationCommands = `npm run build
npm start
curl -s http://localhost:3000/docs/seo | grep -E "<title>|canonical|og:title|description"
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/sitemap.xml`;

const page: LitoPageModule = {
  document: createSeoDocument(
    "Litoho SEO and SSR",
    "Use Litoho route metadata, SSR output, canonical links, Open Graph tags, robots.txt, and sitemap.xml to ship SEO-friendly Lit pages.",
    "/docs/seo"
  ),
  render: () => html`
    ${renderDocHero(
      "SEO and SSR",
      "Litoho makes SEO route-native. Data loading, document metadata, server-rendered HTML, and page content live in the same route tree, so every URL can explain itself before the browser runs client JavaScript."
    )}

    <section class="grid gap-6">
      <article class="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-amber-200">Core idea</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">The route owns the head</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          A Litoho page can return metadata from <code>document</code>. Static document objects are fine for simple
          pages, and document functions can use loaded data, params, pathname, query, and layout data for dynamic SEO.
        </p>
        ${renderCodeBlock(routeDocumentExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Document fields</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          The server renderer turns the resolved document into the final <code>&lt;head&gt;</code>. Metadata is escaped
          by the framework before being written into HTML.
        </p>
        <div class="mt-5 grid gap-3">
          ${documentFields.map(
            ([field, description]) => html`
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[8rem_1fr]">
                <code class="text-sm text-amber-200">${field}</code>
                <p class="text-sm leading-6 text-slate-400">${description}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Layout metadata inheritance</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Layout documents and page documents are resolved from parent layout to child page. The closest page can
          override <code>title</code> and <code>lang</code>, while arrays like <code>meta</code>, <code>links</code>, and
          <code>styles</code> are appended so layouts can define site-wide defaults.
        </p>
        ${renderCodeBlock(layoutDocumentExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">SSR by default</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Routes are server-rendered unless marked with <code>"use client"</code>. This gives crawlers, link unfurlers,
          and no-JavaScript previews real HTML with headings and body copy already present.
        </p>
        <div class="mt-5 grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p class="text-sm font-semibold text-white">Crawlable first paint</p>
            <p class="mt-2 text-sm leading-6 text-slate-400">Primary route content is in the server response.</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p class="text-sm font-semibold text-white">Social previews</p>
            <p class="mt-2 text-sm leading-6 text-slate-400">Open Graph tags are available without hydration.</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p class="text-sm font-semibold text-white">Small client runtime</p>
            <p class="mt-2 text-sm leading-6 text-slate-400">Interactive code can stay scoped to the routes that need it.</p>
          </div>
        </div>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">When to use "use client"</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Client routes are useful for browser-only demos, heavy interactive tools, or widgets that cannot render on the
          server. Keep important landing pages, docs pages, pricing pages, and content pages server-rendered whenever
          possible.
        </p>
        ${renderCodeBlock(clientTradeoffExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Canonical and social image strategy</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Use one canonical URL per page and point Open Graph URLs to the same preferred address. Put shared images such
          as <code>logo.png</code> or social cards in <code>public/</code> so the server can serve them directly.
        </p>
        ${renderCodeBlock(`public/
  logo.png
  robots.txt

document: {
  links: [
    { rel: "canonical", href: "https://litoho.dev/docs/seo" },
    { rel: "icon", href: "/logo.png", type: "image/png" }
  ],
  meta: [
    { property: "og:url", content: "https://litoho.dev/docs/seo" },
    { property: "og:image", content: "https://litoho.dev/logo.png" }
  ]
}`)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">robots.txt and sitemap.xml</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          Static assets in <code>public/</code> are enough for simple robots files. For dynamic sitemaps, add top-level
          server routes before mounting the Litoho app, like this documentation site does.
        </p>
        ${renderCodeBlock(robotsSitemapExample)}
      </article>

      <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Content quality still matters</h2>
        <p class="mt-3 text-sm leading-7 text-slate-400">
          The framework can put your content in the right place, but ranking still depends on clarity. Put the answer
          early, use semantic headings, avoid thin pages, and keep examples concrete.
        </p>
        <div class="mt-5 grid gap-3">
          ${seoChecklist.map(
            (item, index) => html`
              <div class="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-300/15 text-xs font-semibold text-emerald-200">
                  ${index + 1}
                </span>
                <p class="text-sm leading-6 text-slate-300">${item}</p>
              </div>
            `
          )}
        </div>
      </article>

      <article class="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
        <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white">Validation checklist</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Build once, run production mode locally, then inspect the server response. Do not rely only on the browser
          Elements panel because it shows the hydrated DOM after client code has run.
        </p>
        ${renderCodeBlock(validationCommands)}
      </article>
    </section>
  `
};

export default page;
