import { CopyButton } from "../../copy-button.tsx";
import { siteData } from "virtual-site-data";
import { useRef } from "react";

export const Code = (props: any) => {
  return (
    <code
      className={
        "py-[2.5px] px-1.5 mp-default-color-bg mp-mantine-border border rounded-lg mp-mantine-text leading-none break-words break-spaces inline"
      }
      {...props}
    />
  );
};

export const Pre = (props: any) => {
  const preRef = useRef<HTMLDivElement>();

  return (
    <pre
      {...props}
      className={
        "relative overflow-auto rounded-xl p-[15px_24px] group mp-mantine-border border"
      }
      ref={preRef}
      data-rehype-custom-code
    >
      {siteData.codeHighlighting.copyButton ? (
        <div className={"absolute top-2 right-2 h-8 w-8"}>
          <CopyButton preRef={preRef} />
        </div>
      ) : null}
      {props.children}
    </pre>
  );
};
