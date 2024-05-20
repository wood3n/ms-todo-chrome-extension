import { InteractionType } from "@azure/msal-browser";

import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";

import { scopes } from "@/auth/loginRequest";
import { useAccount } from "@azure/msal-react";
import { msalInstance } from "../auth/msal-instance";

const useClient = () => {
	const account = useAccount();

	const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
		msalInstance,
		{
			account: account!, // the AccountInfo instance to acquire the token for.
			interactionType: InteractionType.Popup, // msal-browser InteractionType
			scopes,
		},
	);

	const graphClient = Client.initWithMiddleware({
		authProvider,
	});

	return graphClient;
};

export default useClient;
