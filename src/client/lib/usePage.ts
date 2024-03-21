import { matchRoutes, type Route } from "../../rsbuild/router.ts";
import { routes } from "virtual-site-data";
import type { PageData } from "../client.tsx";

export const usePage = async (): Promise<PageData | undefined> => {
  let route: Route;
  let meta: any;

  const _match = matchRoutes(routes, window.location.pathname);
  const match = Array.isArray(_match) ? _match[0] : _match;

  if (match) {
    route = match;
    await match.preload().then((_meta: any) => {
      meta =
        _meta.default.__PAGE_META__[
          encodeURIComponent(match?.fullPath.replaceAll("/", "\\"))
        ];
    });

    if (route) {
      return { route, meta };
    }
  }

  return {
    route: null,
    meta: null,
  };
};
