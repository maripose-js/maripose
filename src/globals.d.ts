import type { Route } from "./rsbuild/router.ts";

declare module "virtual-site-data" {
  import type { SiteConfig } from "./utils/config.ts";
  export const siteData: SiteConfig;
}

declare module "virtual-custom-css";

declare module "virtual-routes" {
  export const routes: Route[];
}
