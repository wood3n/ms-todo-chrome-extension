import {
	type Configuration,
	LogLevel,
	PublicClientApplication,
} from "@azure/msal-browser";
import { ClientId, MSAuthUrl, RedirectUri, TenantId } from "./azure-app-info";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
	auth: {
		clientId: ClientId,
		authority: `${MSAuthUrl}/${TenantId}`,
		redirectUri: RedirectUri,
		postLogoutRedirectUri: RedirectUri,
	},
	cache: {
		cacheLocation: "localStorage", // This configures where your cache will be stored
		storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						console.info(message);
						return;
					case LogLevel.Verbose:
						console.debug(message);
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
					default:
						return;
				}
			},
		},
	},
};

export const msalInstance = new PublicClientApplication(msalConfig);
