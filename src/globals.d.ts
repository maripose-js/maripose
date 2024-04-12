
declare module "virtual-site-data" {
  import type { SiteConfig } from "./utils/config.ts";
  export const siteData: SiteConfig;
}

declare module "virtual-custom-css";

declare module "virtual-routes" {
  import type { Route } from "./rsbuild/router.ts";
  export const routes: Route[];
}
