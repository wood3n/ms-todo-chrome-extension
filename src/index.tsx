import ReactDOM from "react-dom/client";

import { type AuthenticationResult, type EventMessage, EventType } from "@azure/msal-browser";

import App from "./app";
import { msalInstance } from "./auth/ms-oauth";

msalInstance.initialize().then(() => {
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  msalInstance.enableAccountStorageEvents();

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

  root.render(<App />);
});
