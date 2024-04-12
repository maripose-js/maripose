import { routes } from "virtual-routes";
import type { Route, Tab } from "../../rsbuild/router.ts";

export type GroupedRoutes = {
  routes: Route[];
  tab: Tab;
}[];

export const useGroupedRoutes = (): GroupedRoutes => {
  return routes
    .reduce(
      (acc, route) => {
        const tab = route.tab.name;
        const existingTab = acc.find((item: any) => item.tab.name === tab);

        if (existingTab) {
          existingTab.routes.push(route);
        } else {
          acc.push({
            routes: [route],
            tab: route.tab,
          });
        }

        return acc;
      },
      [] as { routes: Route[]; tab: Tab }[],
    )
    .sort((a: any, b: any) => a.tab.order - b.tab.order)
    .filter((group: any) => group.routes.length > 0);
};
