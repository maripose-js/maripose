import type { Processor, Plugin } from "unified";
import type { Root } from "hast";
import { visitChildren } from "unist-util-visit-children";

//TODO: finish this

export interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

export interface Toc {
  title: string;
  depth: number;
  searchDepth: number;
  links: TocLink[];
}

export interface Heading {
  type: string;
  depth?: number;
  children?: ChildNode[];
}

export const remarkToc: Plugin<[], Root> = function (this: Processor) {
  return (tree: Root) => {
    // visitChildren((node: Heading) => {
    //   if (node.type !== "heading") return;
    // })(tree);
  };
};
