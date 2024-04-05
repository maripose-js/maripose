import type { PageData } from "../../app.tsx";
import { IconBase } from "../icons/base.tsx";
import { Text } from "@mantine/core";
import { routes as _routes } from "virtual-site-data";
import { Link } from "react-router-dom";

export const DocSurround = ({ data }: { data: PageData }) => {
  const routes = _routes.filter((e) => e.page && !e.custom);
  const routeIndex = routes.indexOf(data.route);
  const prev = routes[routeIndex - 1] ?? null;
  const next = routes[routeIndex + 1] ?? null;

  return (
    <div className="w-full py-3 gap-5 grid md:grid-cols-2">
      {prev && (
        <Link to={prev.route}>
          <div className="px-6 py-8 mp-mantine-border border not-prose rounded-lg hover:bg-[hsl(var(--muted-foreground))]/50 cursor-pointer flex flex-row items-center justify-between">
            <IconBase
              icon="tabler:arrow-left"
              size={6}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors border mp-mantine-border bg-[hsl(var(--muted-foreground))]/50 p-0.5 w-8 h-8"
            />
            <div className="text-right">
              <Text c="dimmed">previous</Text>
              <Text className="!font-bold !text-white !text-lg">
                {prev.page.title}
              </Text>
            </div>
          </div>
        </Link>
      )}
      {next && (
        <Link to={next.route}>
          <div className="px-6 py-8 mp-mantine-border border not-prose rounded-lg hover:bg-[hsl(var(--muted-foreground))]/50 cursor-pointer flex flex-row items-center justify-between">
            <div className="text-left">
              <Text c="dimmed">Next</Text>
              <Text className="!font-bold !text-white !text-lg">
                {next.page.title}
              </Text>
            </div>
            <IconBase
              icon="tabler:arrow-right"
              size={6}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors border mp-mantine-border bg-[hsl(var(--muted-foreground))]/50 p-0.5 w-8 h-8"
            />
          </div>
        </Link>
      )}
    </div>
  );
};
