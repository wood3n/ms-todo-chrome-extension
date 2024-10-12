import { ErrorBoundary } from "react-error-boundary";

import { type AuthenticationResult, type EventMessage, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";

import { msalInstance } from "@/auth/ms-oauth";

import App from "./app";

msalInstance.initialize().then(() => {
  const accounts = msalInstance.getAllAccounts();

  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

  root.render(
    <MsalProvider instance={msalInstance}>
      <NextUIProvider locale={navigator.language} className="size-full">
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <App />
        </ErrorBoundary>
      </NextUIProvider>
    </MsalProvider>,
  );
});
