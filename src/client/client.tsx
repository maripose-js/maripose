import React from "react";
import ReactDOM from "react-dom/client";
import { usePage } from "./lib/usePage.ts";
import { NotFound } from "./pages/not-found.tsx";
import { Layout } from "./layout.tsx";

const App = () => {
  const { route } = usePage();

  return (
    <Layout>
      route ? <>{route?.comp}</> : <NotFound />
    </Layout>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
