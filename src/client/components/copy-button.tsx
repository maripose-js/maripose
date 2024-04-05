import React, { memo, useState } from "react";
import { ActionIcon } from "./action-icon.tsx";
import { useDebouncedState } from "@mantine/hooks";
import { IconBase } from "./icons/base.tsx";

export const CopyButton = memo(
  ({
    preRef,
  }: {
    preRef: React.MutableRefObject<HTMLDivElement | undefined>;
  }) => {
    const [copied, setCopied] = useState(false);
    const icon = copied ? "tabler:copy-check-filled" : "tabler:copy";

    return (
      <ActionIcon
        aria-label={copied ? "Copied" : "Copy"}
        onClick={() => {
          const code = Array.from(preRef.current?.children!)
            .filter((child) => child.nodeName === "CODE")
            .map((child) => {
              return Array.from(child.children).map((codeElement) => {
                return codeElement.textContent;
              });
            });

          let stringCode = "";

          for (const line of code) {
            stringCode += line.join("\n");
          }
          void window.navigator.clipboard.writeText(stringCode);

          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        className={
          "w-full h-full group-hover:flex items-center justify-center mp-default-color-bg hidden"
        }
      >
        <IconBase icon={icon} />
      </ActionIcon>
    );
  }
);
