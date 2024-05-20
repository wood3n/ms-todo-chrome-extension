import {
	AccountInfo,
	InteractionType,
	PublicClientApplication,
} from "@azure/msal-browser";

import { Client } from "@microsoft/microsoft-graph-client";
import {
	AuthCodeMSALBrowserAuthenticationProvider,
	type AuthCodeMSALBrowserAuthenticationProviderOptions,
} from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";

import { msalInstance } from "../auth/msal-instance";

const options: AuthCodeMSALBrowserAuthenticationProviderOptions = {
	account, // the AccountInfo instance to acquire the token for.
	interactionType: InteractionType.Popup, // msal-browser InteractionType
	scopes: ["user.read", "mail.send"], // example of the scopes to be passed
};

// Pass the PublicClientApplication instance from step 2 to create AuthCodeMSALBrowserAuthenticationProvider instance
const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
	msalInstance,
	options,
);

// Initialize the Graph client
export const graphClient = Client.initWithMiddleware({
	authProvider,
});
