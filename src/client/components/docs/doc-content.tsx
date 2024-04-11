import type { PageData } from "../../app.tsx";
import { MDXProvider } from "@mdx-js/react";
import "./markdown-styles.css";
import { H1, H2, H3, H4, H5, H6 } from "./comps/title.tsx";
import { type CSSProperties, Suspense } from "react";
import { Code, Pre } from "./comps/code.tsx";
import { Hr } from "./comps/hr.tsx";
import { Li, Ol, Ul } from "./comps/list.tsx";
import { Blockquote } from "./comps/blockquote.tsx";
import { Image } from "./comps/image.tsx";
import { Callout } from "./comps/callout.tsx";
import { Kbd } from "./comps/kbd.tsx";
import { Tooltip } from "#/docs/comps/tooltip.tsx";
import { Step, Steps } from "#/docs/comps/steps.tsx";

export const DocContent = ({ data }: { data: PageData }) => {
  const Content = () => {
    return <Suspense fallback={<></>}>{data.route?.comp}</Suspense>;
  };

  return (
    <div
      className={"pt-3 markdown-body"}
      style={
        {
          "--mp-link-color": "var(--mantine-primary-color-filled)",
        } as CSSProperties
      }
    >
      <MDXProvider
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          code: Code,
          hr: Hr,
          strong: (props) => <strong {...props} className={"font-bold"} />,
          a: (props) => (
            <a
              className={
                "bg-transparent hover:underline no-underline !text-[var(--mp-link-color)]"
              }
              {...props}
            />
          ),
          p: (props) => <p {...props} className={"py-4"} />,
          ul: Ul,
          li: Li,
          ol: Ol,
          blockquote: Blockquote,
          img: Image,
          pre: Pre,
          Callout,
          Kbd,
          Tooltip,
          Steps,
          Step,
        }}
      >
        <Content />
      </MDXProvider>
    </div>
  );
};
