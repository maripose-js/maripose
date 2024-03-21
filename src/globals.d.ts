declare module "virtual-site-data" {
  import type { SiteConfig } from "./utils/config.ts";
  import type { Route } from "./rsbuild/router.ts";
  export const routes: Route[];
  export const siteData: SiteConfig;
}
