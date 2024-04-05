import type { PageData } from "../app.tsx";
import { DocHeader } from "../components/docs/doc-header.tsx";
import { DocLinks } from "../components/docs/doc-links.tsx";
import { DocContent } from "../components/docs/doc-content.tsx";
import { DocSurround } from "../components/docs/doc-surround.tsx";
import { DocToc } from "../components/docs/doc-toc.tsx";

export const DocPage = ({ data }: { data: PageData }) => {
  return (
    <div
      className={
        "mx-auto px-4 sm:px-6 lg:px-8 max-w-[84rem] grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-8"
      }
    >
      <div className="md:col-span-2 lg:col-span-1">
        <div className="hidden md:block md:sticky top-[5rem] py-8 overflow-y-auto">
          <DocLinks currentRoute={data} />
        </div>
      </div>

      <div className="md:col-span-4 lg:col-span-3 w-full">
        {!data.meta?.title && !data.meta?.description ? null : (
          <DocHeader data={data} />
        )}

        <DocContent data={data} />

        <DocSurround data={data} />
      </div>

      <div className="lg:col-span-1">
        <div className="hidden lg:block lg:sticky top-[5rem] py-8 overflow-y-auto">
          <DocToc data={data} />
        </div>
      </div>
    </div>
  );
};
