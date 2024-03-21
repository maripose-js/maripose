import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { usePage } from "./lib/usePage.ts";
import { NotFound } from "./pages/not-found.tsx";
import { Layout } from "./layout.tsx";
import { HomePage } from "./pages/home-page.tsx";
import type { Route } from "../rsbuild/router.ts";
import "./globals.css";

import { createHead, useHead } from "unhead";

const head = createHead();

export type PageData = {
  meta: any;
  route: Route | null;
};

const App = () => {
  const [data, setData] = React.useState<PageData | null>(null);

  useHead({
    title: "My awesome site",
  });

  useEffect(() => {
    const fetchData = async () => {
      const _data = await usePage();
      if (_data) {
        setData({ route: _data.route, meta: _data.meta });
      }
    };

    void fetchData();
  }, [window.location.pathname]);

  const renderRoute = () => {
    if (!data || !data.route) return <NotFound />;
    if (data.route.route === "/") return <HomePage meta={data.meta} />;
    return <>{data.route?.comp}</>;
  };

  return <Layout>{renderRoute()}</Layout>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
