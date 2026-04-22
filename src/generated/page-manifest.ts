import type { LitoPageManifestEntry } from "@litoho/app";

export const pageManifest: LitoPageManifestEntry[] = [
  {
    page: () => import("../../app/pages/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }],
    routeId: "index",
    routePath: "/"
  },
  {
    page: () => import("../../app/pages/docs/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs",
    routePath: "/docs"
  },
  {
    page: () => import("../../app/pages/docs/cli/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:cli",
    routePath: "/docs/cli"
  },
  {
    page: () => import("../../app/pages/docs/comparison/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:comparison",
    routePath: "/docs/comparison"
  },
  {
    page: () => import("../../app/pages/docs/context/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:context",
    routePath: "/docs/context"
  },
  {
    page: () => import("../../app/pages/docs/deployment/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:deployment",
    routePath: "/docs/deployment"
  },
  {
    page: () => import("../../app/pages/docs/getting-started/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:getting-started",
    routePath: "/docs/getting-started"
  },
  {
    page: () => import("../../app/pages/docs/routing/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:routing",
    routePath: "/docs/routing"
  },
  {
    page: () => import("../../app/pages/docs/security/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:security",
    routePath: "/docs/security"
  },
  {
    page: () => import("../../app/pages/docs/seo/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:seo",
    routePath: "/docs/seo"
  },
  {
    page: () => import("../../app/pages/docs/state/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:state",
    routePath: "/docs/state"
  },
  {
    page: () => import("../../app/pages/docs/ui/_index.ts"),
    layouts: [{ key: "root", loader: () => import("../../app/pages/_layout.ts") }, { key: "docs", loader: () => import("../../app/pages/docs/_layout.ts") }],
    routeId: "docs:ui",
    routePath: "/docs/ui"
  }
];
