import { globby } from "globby";
import { joinURL, withLeadingSlash } from "ufo";
import path from "path";
import pt from "path";
import type { MariposeInstance } from "../context.ts";
import React from "react";

export type RouteInput = {
  route: string;
  file: string;
  fullPath: string;
  tab: Tab;
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
  let routes: RouteInput[] = [];

  return {
    init: async () => {
      const files = await globby("**/*.{mdx,md}", {
        ignore: ["**/.git/**", "**/node_modules/**"],
        cwd: routesDir,
      });

      files.forEach((file) => {
        const route = resolveRouteFromPath(file, ctx, routesDir);
        routes.push({
          file,
          route: withLeadingSlash(route.path),
          fullPath: path.join(routesDir, file),
          tab: route.tab,
        });
      });
    },
    generate: () => {
      return `import { createElement } from 'react'; import { lazyWithPreload } from "react-lazy-with-preload"; ${routes
        .map(
          (route, index) =>
            `const R${index} = lazyWithPreload(() => import('${route.fullPath.replaceAll(
              "\\",
              "/"
            )}')) `
        )
        .join("; ")} ; export const routes = [${routes
        .map(
          (route, index) =>
            `{ fullPath: '${route.fullPath.replaceAll("\\", "/")}', route: '${
              route.route
            }', comp: createElement(R${index}), tab: ${JSON.stringify(
              route.tab
            )}, file: '${
              route.file
            }', preload: async () => { await R${index}.preload(); return import("${route.fullPath.replaceAll(
              "\\",
              "/"
            )}") } }`
        )
        .join(",")}]`;
    },
  };
};

export const resolveRouteFromPath = (
  _path: string,
  ctx: MariposeInstance,
  routesDir: string
): {
  path: string;
  tab: Tab;
} => {
  const path = /index\.(mdx|md)$/.test(_path)
    ? _path
    : joinURL(ctx.config?.site.basePath!, _path);

  const segments = path.split("/");
  const regex = /tab-([a-zA-Z0-9-]+)/;

  for (const segment of segments) {
    if (regex.test(segment)) {
      return {
        path: path
          .replace(/\.[^.]+$/, "")
          .replace("tab-", "")
          .replaceAll("index", ""),
        tab: {
          name: segment.replace("tab-", ""),
          path: pt.join(routesDir, segment),
        },
      };
    }
  }

  return {
    path: path.replace(/\.[^.]+$/, "").replaceAll("index", "/"),
    tab: null,
  };
};

export const matchRoutes = (
  routes: Route[],
  pathname: string
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
  const routeSegments = routePath.split("/");
  const targetSegments = targetPath.split("/");

  if (routeSegments.length !== targetSegments.length) {
    return false;
  }

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
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
