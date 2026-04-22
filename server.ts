import { createServer as createNodeServer } from "node:http";
import { createServer as createNetServer } from "node:net";
import { resolve } from "node:path";
import { getRequestListener } from "@hono/node-server";
import { Hono } from "hono";
import { loadLitoAppFromManifest } from "@litoho/app";
import {
  composeMiddlewares,
  createDevClientAssets,
  createLitoServer,
  createManifestClientAssets,
  withBodyLimit,
  withCsrf,
  withCsp,
  withJsonBody,
  withOriginCheck,
  withRateLimit,
  withRequestTimeout
} from "@litoho/server";
import { docsNavigation } from "./src/docs";
import { apiModulePaths } from "./src/generated/api-manifest";
import { pageManifest } from "./src/generated/page-manifest";

type ViteDevServer = {
  middlewares: (
    request: import("node:http").IncomingMessage,
    response: import("node:http").ServerResponse,
    next: (error?: Error) => void
  ) => void;
  close: () => Promise<void>;
};

const port = Number(process.env.PORT ?? 3000);
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const isProduction = mode === "production";
const rootDir = resolve(process.cwd());
const distRoot = resolve(rootDir, "dist");
const publicRoot = resolve(rootDir, "public");
const manifestPath = resolve(distRoot, "manifest.json");
const siteUrl = (process.env.SITE_URL?.trim() || `http://localhost:${port}`).replace(/\/$/, "");
const siteHost = new URL(siteUrl).host;
const allowedHosts = isProduction
  ? [siteHost, "litoho.dev", "www.litoho.dev"]
  : ["localhost", `localhost:${port}`, "127.0.0.1", `127.0.0.1:${port}`];

const manifestBaseUrl = new URL("./src/generated/", import.meta.url);
const appManifest = await loadLitoAppFromManifest({
  manifestBaseUrl,
  pageManifest,
  apiModulePaths
});

const frameworkApp = createLitoServer({
  appName: "Litoho",
  allowedHosts,
  trustedProxy: isProduction
    ? {
        hops: 1
      }
    : undefined,
  audit: {
    onEvent(event) {
      if (!isProduction) {
        console.log(`[litoho audit] ${event.type} ${event.severity} ${event.pathname ?? "/"}`);
      }
    }
  },
  clientAssets: isProduction
    ? createManifestClientAssets({
        manifestPath
      })
    : createDevClientAssets(),
  staticRoot: isProduction ? distRoot : undefined,
  publicRoot,
  pages: appManifest.pages,
  apiRoutes: appManifest.apiRoutes,
  middlewares: [
    composeMiddlewares(
      withRequestTimeout({ timeoutMs: 10_000 }),
      withRateLimit({ limit: 180, windowMs: 60_000 }),
      withBodyLimit({ maxBytes: 1_048_576 }),
      withJsonBody(),
      withOriginCheck(),
      withCsrf(),
      withCsp({
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://static.cloudflareinsights.com"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          connectSrc: isProduction ? ["'self'"] : ["'self'", "ws://localhost:*", "http://localhost:*"]
        },
        reportOnly: !isProduction
      }),
      ...appManifest.middlewares
    )
  ],
  notFoundPage: appManifest.notFoundPage,
  errorPage: appManifest.errorPage
});

const app = new Hono();
const sitemapRoutes = ["/", "/docs", ...docsNavigation.map((item) => item.href)];

app.get("/robots.txt", (context) => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`
  ].join("\n");

  context.header("content-type", "text/plain; charset=utf-8");
  return context.body(body);
});

app.get("/sitemap.xml", (context) => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (pathname) => `  <url>
    <loc>${siteUrl}${pathname}</loc>
    <changefreq>${pathname === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${pathname === "/" ? "1.0" : pathname === "/docs" ? "0.9" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  context.header("content-type", "application/xml; charset=utf-8");
  return context.body(body);
});

app.route("/", frameworkApp);

const honoListener = getRequestListener(app.fetch);
let vite: ViteDevServer | undefined;

const httpServer = createNodeServer(async (request, response) => {
  if (vite) {
    await new Promise<void>((resolveRequest, rejectRequest) => {
      vite!.middlewares(request, response, (error?: Error) => {
        if (error) {
          rejectRequest(error);
          return;
        }

        resolveRequest();
      });
    });

    if (response.writableEnded) {
      return;
    }
  }

  await honoListener(request, response);
});

if (!isProduction) {
  vite = await createDevViteServer(rootDir);
}

await new Promise<void>((resolveListen) => {
  httpServer.listen(port, resolveListen);
});

console.log(`Litoho framework site is running at http://localhost:${port}`);

async function createDevViteServer(root: string): Promise<ViteDevServer> {
  const { createServer } = await import("vite");
  const hmrPort = await resolveHmrPort(port);

  return createServer({
    appType: "custom",
    root,
    server: {
      middlewareMode: true,
      hmr: {
        port: hmrPort,
        clientPort: hmrPort
      }
    }
  });
}

async function resolveHmrPort(appPort: number) {
  const configuredPort = toOptionalNumber(process.env.LITOHO_HMR_PORT);

  if (configuredPort) {
    return configuredPort;
  }

  for (let candidate = appPort + 1; candidate <= appPort + 10; candidate += 1) {
    if (await isPortAvailable(candidate)) {
      return candidate;
    }
  }

  return appPort + 1;
}

async function isPortAvailable(candidatePort: number) {
  return new Promise<boolean>((resolveAvailability) => {
    const probe = createNetServer();

    probe.once("error", () => {
      resolveAvailability(false);
    });

    probe.listen(candidatePort, () => {
      probe.close(() => {
        resolveAvailability(true);
      });
    });
  });
}

function toOptionalNumber(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
