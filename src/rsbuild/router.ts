import { globby } from "globby";
import { joinURL, withLeadingSlash } from "ufo";
import path from "path";
import type { CordInstance } from "../context.ts";

export type RouteInput = {
  route: string;
  file: string;
  fullPath: string;
};

export type Route = RouteInput & {
  comp: React.ReactNode;
  preload: () => Promise<any>;
};

export const createRouter = (routesDir: string, ctx: CordInstance) => {
  let routes: RouteInput[] = [];

  return {
    init: async () => {
      const files = await globby("**/*.{mdx,md}", {
        ignore: ["**/.git/**", "**/node_modules/**"],
        cwd: routesDir,
      });

      files.forEach((file) => {
        routes.push({
          file,
          route: withLeadingSlash(
            /index\.(mdx|md)$/.test(file)
              ? resolveRouteFromPath(file)
              : joinURL(ctx.config?.basePath!, resolveRouteFromPath(file))
          ),
          fullPath: path.join(routesDir, file),
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
            }', comp: createElement(R${index}), file: '${
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

//TODO: improve this function
export const resolveRouteFromPath = (path: string) => {
  return path.replace(/\.[^.]+$/, "").replaceAll("index", "/");
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
