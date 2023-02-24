import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app";
import "./index.css";
import "@fontsource/spline-sans/400.css";
import "@fontsource/spline-sans/500.css";
import "@fontsource/spline-sans/600.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
