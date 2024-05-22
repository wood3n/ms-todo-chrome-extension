import { InteractionType } from "@azure/msal-browser";

import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";

import { Scopes, msalInstance } from "@/auth/ms-oauth";

// Pass the PublicClientApplication instance from step 2 to create AuthCodeMSALBrowserAuthenticationProvider instance
const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
	msalInstance,
	{
		account: msalInstance.getAllAccounts()[0], // the AccountInfo instance to acquire the token for.
		interactionType: InteractionType.Redirect, // msal-browser InteractionType
		scopes: Scopes, // example of the scopes to be passed
	},
);

// Initialize the Graph client
export const graphClient = Client.initWithMiddleware({
	authProvider,
});
