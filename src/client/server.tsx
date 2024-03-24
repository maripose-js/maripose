import { usePage } from "./lib/usePage.ts";
import { renderToString } from "react-dom/server";
import { App } from "./app.tsx";
import { StaticRouter } from "react-router-dom/server";
import React, { useEffect, useState } from "react";
import { NotFound } from "./pages/not-found.tsx";
import { HomePage } from "./pages/home-page.tsx";
import { Layout } from "./layout.tsx";

export const render = async (pathname: string) => {
  const data = await usePage(pathname);
  const renderRoute = () => {
    if (!data || !data.route) return <NotFound />;
    if (data.route.route === "/") return <HomePage meta={data.meta} />;
    return <>{data.route?.comp}</>;
  };

  const AppWithRouter = () => (
    <StaticRouter location={pathname}>
      <Layout>{renderRoute()}</Layout>
    </StaticRouter>
  );

  const html = renderToString(<AppWithRouter />);

  return { html, data };
};
