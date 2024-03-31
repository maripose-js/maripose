import type { PageData } from "../../app.tsx";
import { MDXProvider } from "@mdx-js/react";
import "./markdown-styles.css";
import { H1, H2, H3, H4, H5, H6 } from "./comps/title.tsx";
import { Suspense } from "react";
import { Code } from "./comps/code.tsx";
import { Hr } from "./comps/hr.tsx";
import { Li, Ol, Ul } from "./comps/list.tsx";
import { Blockquote } from "./comps/blockquote.tsx";
import { Image } from "./comps/image.tsx";

export const DocContent = ({ data }: { data: PageData }) => {
  const Content = () => {
    return <Suspense fallback={<></>}>{data.route?.comp}</Suspense>;
  };

  return (
    <div className={"pt-3 markdown-body"}>
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
                "bg-transparent hover:underline no-underline mp-primary-text-color"
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
        }}
      >
        <Content />
      </MDXProvider>
    </div>
  );
};
