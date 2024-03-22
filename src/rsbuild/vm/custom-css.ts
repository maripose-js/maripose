import path from "path";
import type { VmCtx } from "./vm.ts";

export const customCss = async (ctx: VmCtx) => {
  let content: string[] = [];
  if (ctx.config.site?.styles) {
    const styles = Array.isArray(ctx.config.site.styles)
      ? ctx.config.site.styles
      : [ctx.config.site.styles];

    content = await Promise.all(
      styles.map(async (style) => {
        const pt = !path.isAbsolute(style)
          ? path.join(ctx.config.root!, style)
          : style;
        return `import "${pt.replaceAll("\\", "/")}";`;
      })
    );
  }

  return {
    ["virtual-custom-css"]: content.join(" "),
  };
};
