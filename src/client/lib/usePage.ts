import { useEffect, useState } from "react";
import { matchRoutes, type Route } from "../../rsbuild/router.ts";
import { routes } from "virtual-site-data";

export const usePage = () => {
  const [route, setRoute] = useState<Route>();
  const [meta, setMeta] = useState<any>();

  useEffect(() => {
    const _match = matchRoutes(routes, window.location.pathname);
    const match = Array.isArray(_match) ? _match[0] : _match;

    if (match) {
      const fetchData = async () => {
        setRoute(match);

        await match.preload().then((meta: any) => {
          setMeta(
            meta.default.__PAGE_META__[encodeURIComponent(match.file)] ?? {}
          );
        });
      };
      void fetchData();
    }
  }, [window.location.pathname]);

  return { route, meta };
};
