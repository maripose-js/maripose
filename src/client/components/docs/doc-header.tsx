import type { PageData } from "@/app.tsx";
import { Text, Title } from "@mantine/core";

export const DocHeader = ({ data }: { data: PageData }) => {
  return (
    <div className="mp-doc-header">
      <div className="flex-1">
        {data.meta?.title ? (
          <div className="mp-doc-header-title">
            <Title>{data.meta.title}</Title>
          </div>
        ) : null}

        {data.meta?.description ? (
          <Text c={"dimmed"}>{data.meta.description}</Text>
        ) : null}
      </div>
    </div>
  );
};
