import { App } from "./app.tsx";
import { BrowserRouter } from "react-router-dom";

const el = document.getElementById("root")!;

const render = async () => {
  const { createRoot, hydrateRoot } = await import("react-dom/client");

  const RouterApp = () => {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

  if (process.env.NODE_ENV === "production") {
    hydrateRoot(el, <RouterApp />);
  } else {
    createRoot(el).render(<RouterApp />);
  }
};

void render();
