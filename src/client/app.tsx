import { usePage } from "./lib/usePage.ts";
import { NotFound } from "./pages/not-found.tsx";
import { Layout } from "./layout.tsx";
import { HomePage } from "./pages/home-page.tsx";
import type { Route } from "../rsbuild/router.ts";
import "./globals.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { BentoGridItem } from "../utils/config.ts";
import { DocPage } from "./pages/doc-page.tsx";
import type { TocItem } from "../rsbuild/mdx/toc.ts";

export type PageData = {
  meta: {
    features?: BentoGridItem[];
    title: string;
    description: string;
    toc?: TocItem[];
  } | null;
  route: Route | null;
};

export const App = () => {
  const [data, setData] = React.useState<PageData | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const _data = await usePage(location.pathname);
      if (_data) {
        setData({ route: _data.route, meta: _data.meta });
      }
    };

    void fetchData();
  }, [location.pathname]);

  const renderRoute = () => {
    if (!data || !data.route) return <NotFound />;
    if (data.route.route === "/") return <HomePage data={data} />;
    if (data.route.custom) return <>{data.route.comp}</>;
    return <DocPage data={data} />;
  };

  return <Layout data={data!}>{renderRoute()}</Layout>;
};
