import { matchRoutes, type Route } from "../../rsbuild/router.ts";
import { routes, siteData } from "virtual-site-data";
import type { PageData } from "../client.tsx";
import { isSamePath } from "ufo";

export const usePage = async (): Promise<PageData | undefined> => {
  let route: Route;
  let meta: any;

  const _match = matchRoutes(routes, window.location.pathname);
  const match = Array.isArray(_match) ? _match[0] : _match;

  if (match) {
    const redirects = Object.entries(siteData.redirects);
    let redirect = match.route;
    if (
      redirects.some(([from, to]: any) => {
        redirect = to;
        return isSamePath(from, match.route);
      })
    ) {
      window.location.href = redirect;
      return;
    }
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
