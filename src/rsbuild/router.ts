import path from "node:path";
import pt from "node:path";
import { joinURL, withLeadingSlash } from "ufo";
import React from "react";
import { Glob } from "bun";
import type { MariposeInstance } from "../context.ts";

export type RouteInput = {
  route: string;
  file: string;
  fullPath: string;
  tab: Tab;
  custom?: boolean;
  page?: {
    title: string;
    file: string;
    icon?: string;
  } | null;
};

export type Tab = {
  name: string;
  path: string;
} | null;

export type Route = RouteInput & {
  comp: React.ReactNode;
  preload: () => Promise<any>;
};

export const createRouter = (routesDir: string, ctx: MariposeInstance) => {
  const routes: RouteInput[] = [];

  return {
    init: async () => {
      const glob = new Glob("*.{mdx,md}");
      const files = glob.scan({
        cwd: routesDir,
      });

      if (ctx.config?.site?.sidebar) {
        for (const sidebarItem of ctx.config?.site?.sidebar) {
          for (const page of sidebarItem.pages) {
            const fullPath = path.join(routesDir, page.file);
            routes.push({
              page,
              file: page.file,
              route: withLeadingSlash(resolveRouteFromPath(page.file, ctx)),
              fullPath,
              tab: {
                name: sidebarItem.group,
                path: pt.join(routesDir, sidebarItem.group),
              },
              custom: false,
            });
          }
        }
      }
      for await (const file of files) {
        if (resolveDefaultPages(routesDir, file, ctx)) {
          routes.push({
            file,
            route: withLeadingSlash(resolveRouteFromPath(file, ctx)),
            fullPath: path.join(routesDir, file),
            tab: null,
            custom: true,
            page: null,
          });
        }
      }
    },
    generate: () => {
      console.log(routes);
      return `import { createElement } from 'react'; import { lazyWithPreload } from "react-lazy-with-preload"; ${routes
        .map(
          (route, index) =>
            `const R${index} = lazyWithPreload(() => import('${route.fullPath.replaceAll(
              "\\",
              "/",
            )}')) `,
        )
        .join("; ")} ; export const routes = [${routes
        .map(
          (route, index) =>
            `{ fullPath: '${route.fullPath.replaceAll("\\", "/")}', route: '${
              route.route
            }', comp: createElement(R${index}), tab: ${JSON.stringify(
              route.tab,
            )}, file: '${
              route.file
            }', preload: async () => { await R${index}.preload(); return import("${route.fullPath.replaceAll(
              "\\",
              "/",
            )}") }, custom: ${route.custom}, page: ${JSON.stringify(
              route.page,
            )} }`,
        )
        .join(",")}]`;
    },
    routes,
  };
};

const resolveDefaultPages = (
  routesDir: string,
  file: string,
  ctx: MariposeInstance,
) => {
  const pages = ["index.mdx", ...(ctx.config?.site?.pages ?? [])].map(
    (file) => {
      return path.join(routesDir, file).replaceAll("/", "\\");
    },
  );
  const fullPath = path.join(routesDir, file).replaceAll("/", "\\");

  return pages.includes(fullPath);
};

export const resolveRouteFromPath = (
  _path: string,
  ctx: MariposeInstance,
): string => {
  const path = /index\.(mdx|md)$/.test(_path)
    ? _path
    : joinURL(ctx.config?.site?.basePath as string, _path);

  return path.replace(/\.[^.]+$/, "").replaceAll("index", "/");
};
export const matchRoutes = (
  routes: Route[],
  pathname: string,
): Route | undefined | null => {
  if (pathname === "/" || pathname === "") {
    return routes.find((route) => route.route === "/");
  }

  for (const route of routes) {
    if (matchPath(route.route, pathname)) {
      return route;
    }
  }

  return null;
};

const matchPath = (routePath: string, targetPath: string): boolean => {
  const routeSegments = routePath.replace(/\/$/, "").split("/");
  const targetSegments = targetPath.replace(/\/$/, "").split("/");

  if (routeSegments.length !== targetSegments.length) {
    return false;
  }

  for (const [i, routeSegment] of routeSegments.entries()) {
    const targetSegment = targetSegments[i];

    if (routeSegment.startsWith(":")) {
      continue;
    }

    if (routeSegment !== targetSegment) {
      return false;
    }
  }

  return true;
};
