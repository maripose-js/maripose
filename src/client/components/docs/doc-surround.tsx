import type { PageData } from "../../app.tsx";
import { IconBase } from "../icons/base.tsx";
import { Text } from "@mantine/core";

export const DocSurround = ({ data }: { data: PageData }) => {
  return (
    <div className={"w-full py-3 gap-5 grid sm:grid-cols-2"}>
      <div className="block px-6 py-8 mp-mantine-border border not-prose rounded-lg hover:bg-[hsl(var(--muted-foreground))]/50 group mp-default-color-bg cursor-pointer">
        <div
          className={
            "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors " +
            "duration-100 mp-primary-bg-50 group-hover:border-[var(--mantine-primary-color-5)] border mp-mantine-border " +
            `bg-[hsl(var(--muted-foreground))]/50 p-0.5`
          }
        >
          <IconBase icon={"tabler:arrow-left"} size={6} />
        </div>
        <Text>Test</Text>
        <Text c={"dimmed"}>
          Learn how to install Nuxt UI Pro in your Nuxt application.
        </Text>
      </div>
    </div>
  );
};
