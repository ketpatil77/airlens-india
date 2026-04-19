import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import App from "@/App";
import { globalSwrConfig } from "@/lib/swr.config";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={globalSwrConfig}>
      <App />
    </SWRConfig>
  </StrictMode>,
);
