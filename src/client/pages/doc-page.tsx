import type { PageData } from "../app.tsx";
import { DocHeader } from "../components/docs/doc-header.tsx";
import { DocLinks } from "../components/docs/doc-links.tsx";
import { DocContent } from "../components/docs/doc-content.tsx";
import { DocSurround } from "../components/docs/doc-surround.tsx";

export const DocPage = ({ data }: { data: PageData }) => {
  return (
    <div className={"mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"}>
      <div className="flex flex-col md:grid md:grid-cols-10 md:gap-8">
        <div className="md:col-span-3 lg:col-span-2">
          <div className={"hidden md:block py-8 lg:sticky overflow-y-auto"}>
            <DocLinks currentRoute={data} />
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8">
          {!data.meta?.title && !data.meta?.description ? null : (
            <DocHeader data={data} />
          )}

          <DocContent data={data} />

          <DocSurround data={data} />
        </div>
      </div>
    </div>
  );
};
