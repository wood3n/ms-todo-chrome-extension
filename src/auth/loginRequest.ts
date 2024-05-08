import type { PopupRequest } from "@azure/msal-browser";

/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginPopupRequest: PopupRequest = {
	scopes: [
		"User.Read",
		"Tasks.Read",
		"Tasks.Read.Shared",
		"Tasks.ReadWrite",
		"Tasks.ReadWrite.Shared",
	],
};
