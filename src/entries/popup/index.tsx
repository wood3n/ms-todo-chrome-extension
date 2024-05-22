import {
	type AuthenticationResult,
	type EventMessage,
	EventType,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "whatwg-fetch";
import { msalInstance } from "@/auth/ms-oauth";
import App from "./App";

msalInstance.initialize().then(() => {
	// Account selection logic is app dependent. Adjust as needed for different use cases.
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

	const root = ReactDOM.createRoot(
		document.getElementById("root") as HTMLElement,
	);
	root.render(
		<React.StrictMode>
			<NextUIProvider>
				<MsalProvider instance={msalInstance}>
					<App />
				</MsalProvider>
			</NextUIProvider>
		</React.StrictMode>,
	);
});
