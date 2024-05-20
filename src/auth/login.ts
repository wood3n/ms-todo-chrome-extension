import { Scopes } from "./azure-app-info";
import { msalInstance } from "./msal-instance";

import type { AuthenticationResult } from "@azure/msal-browser";

export const getLoginUrl = async () => {
	return new Promise<string>((resolve) => {
		msalInstance.loginRedirect({
			scopes: Scopes,
			onRedirectNavigate: (url) => {
				resolve(url);
				return false;
			},
		});
	});
};

export const launchWebAuthFlow = (url: string) => {
	return new Promise<AuthenticationResult | null>((resolve, reject) => {
		chrome.identity.launchWebAuthFlow(
			{
				interactive: true,
				url,
			},
			(responseUrl) => {
				// Response urls includes a hash (login, acquire token calls)
				if (responseUrl?.includes("#")) {
					msalInstance
						.handleRedirectPromise(`#${responseUrl.split("#")[1]}`)
						.then(resolve)
						.catch(reject);
				} else {
					// Logout calls
					resolve(null);
				}
			},
		);
	});
};

export const getSignedInUser = () => {
	return new Promise((resolve, reject) => {
		if (chrome?.identity) {
			// Running in extension popup
			chrome.identity.getProfileUserInfo((user) => {
				if (user) {
					resolve(user);
				} else {
					resolve(null);
				}
			});
		} else {
			// Running on localhost
			resolve(null);
		}
	});
};
