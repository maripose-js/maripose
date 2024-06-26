import { Link } from "react-router-dom";
import { Divider, Text } from "@mantine/core";
import { capitalize } from "@/lib/utils.ts";
import { IconBase } from "../icons/base.tsx";
import { siteData } from "virtual-site-data";
import type { PageData } from "@/app.tsx";
import { type Route } from "../../../rsbuild/router.ts";
import { routes } from "virtual-routes";

export const DocLinks = ({ currentRoute }: { currentRoute: PageData }) => {
  const currentGroup = currentRoute.route;
  const currentRoutes = routes.filter(
    (e) => e.tab?.name === currentRoute.route?.tab?.name,
  );
  const groups = routes
    .filter((e) => e.tab)
    .map((e) => e.tab)
    .filter((e, i) => {
      return i === routes.findIndex((r) => r.tab?.name === e?.name);
    }) as Route["tab"][];

  return (
    <div className={"sticky"}>
      <div className={"mp-doc-tabs"}>
        {groups.map((_route, index) => {
          const tabSetting = siteData.tabSettings[_route?.name as string] ?? {
            icon: "tabler:question-mark",
            title: capitalize(_route?.name ?? ""),
          };
          const isActive = currentGroup?.tab?.name === _route?.name;
          return _route ? (
            <Link
              key={index}
              className={`mp-doc-tab`}
              to={currentRoutes[0] ? currentRoutes[0].route : "/"}
            >
              <div
                className={`rounded-lg ${
                  isActive ? `mp-doc-active-tab` : "mp-card-bg"
                } mp-mantine-border border p-1 justify-center flex items-center text-black`}
              >
                <IconBase icon={tabSetting.icon} size={4} />
              </div>
              <Text
                c={"dimmed"}
                size={"md"}
                className={isActive ? "mp-doc-active-text" : ""}
              >
                {tabSetting.title}
              </Text>
            </Link>
          ) : null;
        })}
      </div>

      <Divider variant="dotted" />

      <div className={"mp-doc-links mt-3"}>
        {currentRoutes
          .filter((e) => e.page)
          .map((route: Route, index: number) => {
            const isActive = currentRoute.route?.route === route.route;
            const meta = route.page;

            return (
              <Link
                key={index}
                to={route.route}
                className={`mp-doc-link ${index !== 0 ? "mt-2.5" : ""} ${
                  isActive ? "mp-doc-active-link" : ""
                }`}
              >
                <IconBase icon={meta?.icon ?? "tabler:question-mark"} />
                <Text className="!font-thin">{meta?.title}</Text>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
