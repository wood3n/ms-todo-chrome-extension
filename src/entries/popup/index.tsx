import { MsalProvider } from "@azure/msal-react";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { msalInstance } from "../../auth/msalInstance";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </NextUIProvider>
  </React.StrictMode>
);
