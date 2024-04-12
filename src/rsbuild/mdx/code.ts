// modified verison from: https://github.com/shikijs/shiki
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import type { RehypeShikiOptions } from "@shikijs/rehype";
import type { Plugin } from "unified";
import { bundledLanguages, getHighlighter } from "shiki";
import type { BuiltinTheme } from "shiki";
import type {
  CodeOptionsMeta,
  CodeOptionsThemes,
  CodeToHastOptions,
  HighlighterGeneric,
  TransformerOptions,
} from "shiki/core";
import { toString } from "hast-util-to-string";

export interface MapLike<K = any, V = any> {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => this;
}

export interface RehypeShikiExtraOptions {
  /**
   * Add `language-*` class to code element
   *
   * @default false
   */
  addLanguageClass?: boolean;

  /**
   * Custom meta string parser
   * Return an object to merge with `meta`
   */
  parseMetaString?: (
    metaString: string,
    node: Element,
    tree: Root,
  ) => Record<string, any> | undefined | null;

  /**
   * Custom map to cache transformed codeToHast result
   *
   * @default undefined
   */
  cache?: MapLike;

  /**
   * Chance to handle the error
   * If not provided, the error will be thrown
   */
  onError?: (error: unknown) => void;
}

export type RehypeShikiCoreOptions = CodeOptionsThemes<BuiltinTheme> &
  TransformerOptions &
  CodeOptionsMeta &
  RehypeShikiExtraOptions;

const rehypeShiki: Plugin<
  [HighlighterGeneric<any, any>, RehypeShikiCoreOptions],
  Root
> = function (highlighter, options) {
  const { addLanguageClass = false, parseMetaString, cache, ...rest } = options;

  const prefix = "language-";
  return function (tree) {
    visit(tree, "element", (node, index, parent) => {
      if (!parent || index == null || node.tagName !== "pre") {
        return;
      }

      const head = node.children[0];

      if (
        !head ||
        head.type !== "element" ||
        head.tagName !== "code" ||
        !head.properties
      ) {
        return;
      }

      const classes = head.properties.className;

      if (!Array.isArray(classes)) {
        return;
      }

      const language = classes.find(
        (d) => typeof d === "string" && d.startsWith(prefix),
      );

      if (typeof language !== "string") {
        return;
      }

      const code = toString(head as any);

      const cachedValue = cache?.get(code);

      if (cachedValue) {
        parent.children.splice(index, 1, ...cachedValue);
        return;
      }

      const metaString = head.data?.meta ?? head.properties.metastring ?? "";
      console.log(head.data?.meta);
      const meta = parseMetaString?.(metaString, node, tree) || {};

      const codeOptions: CodeToHastOptions = {
        ...rest,
        lang: language.slice(prefix.length),
        meta: {
          ...rest.meta,
          ...meta,
          __raw: metaString,
        },
      };

      codeOptions.transformers ||= [];
      codeOptions.transformers.push({
        name: "maripose:custom-code",
        code(node) {
          this.addClassToHast(node, language);
          node.properties = node.properties || {};
          node.properties.lang = language.slice(prefix.length);
          node.properties["data-line-numbers"] = true;
          return node;
        },
      });

      try {
        const fragment = highlighter.codeToHast(code, codeOptions);
        cache?.set(code, fragment.children);
        parent.children.splice(index, 1, ...fragment.children);
      } catch (error) {
        if (options.onError) {
          options.onError(error);
        } else {
          throw error;
        }
      }
    });
  };
};
export const rehypeCode: Plugin<[RehypeShikiOptions], Root> = function (
  options = {} as any,
) {
  return async (tree: Root) => {
    const themeNames = (
      "themes" in options ? Object.values(options.themes) : [options.theme]
    ).filter(Boolean) as BuiltinTheme[];
    const langs = options.langs || Object.keys(bundledLanguages);

    const func = getHighlighter({
      langs,
      themes: themeNames,
    }).then((highlighter) =>
      rehypeShiki.call(this, highlighter, options as any),
    );

    const handler = await func;
    // @ts-expect-error
    return handler!(tree) as Root;
  };
};
