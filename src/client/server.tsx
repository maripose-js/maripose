import { usePage } from "./lib/usePage.ts";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import React from "react";
import { NotFound } from "./pages/not-found.tsx";
import { HomePage } from "./pages/home-page.tsx";
import { Layout } from "./layout.tsx";
import { DocPage } from "./pages/doc-page.tsx";

export const render = async (pathname: string) => {
  const data = await usePage(pathname);
  const renderRoute = () => {
    if (!data || !data.route) return <NotFound />;
    if (data.route.route === "/") return <HomePage data={data} />;
    if (data.route.custom) return <>{data.route.comp}</>;
    return <DocPage data={data} />;
  };

  const AppWithRouter = () => (
    <StaticRouter location={pathname}>
      <Layout data={data!}>{renderRoute()}</Layout>
    </StaticRouter>
  );

  const html = renderToString(<AppWithRouter />);

  return { html, data };
};
