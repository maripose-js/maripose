import type { Processor, Plugin } from "unified";
import type { Root } from "hast";
import { visitChildren } from "unist-util-visit-children";
import Slugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

interface ChildNode {
  type: "link" | "text" | "inlineCode" | "strong";
  value: string;
  children?: ChildNode[];
}

interface Heading {
  type: string;
  depth?: number;
  children?: ChildNode[];
}

export const parseToc = (tree: Root) => {
  const toc: TocItem[] = [];
  const slugger = new Slugger();
  let title = "";
  visitChildren((node: Heading) => {
    if (node.type !== "heading" || !node.depth || !node.children) {
      return;
    }

    if (node.depth >= 1 && node.depth < 5) {
      const text = node.children
        .map((child: ChildNode) => {
          if (child.type === "link" || child.type === "strong") {
            return child.children?.map((item) => item.value).join("");
          }
          return child.value || "";
        })
        .join("");

      if (node.depth === 1 && !title) {
        title = text;
      } else {
        const id = slugger.slug(text);
        const { depth } = node;
        toc.push({ id, text, depth });
      }
    }
  })(tree);
  return toc;
};

export const remarkToc: Plugin<[], Root> = function (this: Processor) {
  const data = this.data() as {
    meta: any;
  };
  return (tree: Root) => {
    const toc = parseToc(tree);
    data.meta = {
      ...data.meta,
      toc,
    };
  };
};
