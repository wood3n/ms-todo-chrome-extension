import axios from "axios";

export const RedirectUri =
	typeof chrome !== "undefined" && chrome.identity
		? chrome.identity.getRedirectURL()
		: `${window.location.origin}/popup.html`;

export const MSAuthUrl = "https://login.microsoftonline.com";

export const TenantId = "057ab151-e7cd-45a5-8655-4303bf366831";

export const ClientId = "e5da5554-682a-4a9f-ac32-c1a741b6050c";

/**
 * https://learn.microsoft.com/zh-cn/graph/permissions-reference
 */
export const Scopes = [
	"User.Read",
	"Tasks.Read",
	"Tasks.Read.Shared",
	"Tasks.ReadWrite",
	"Tasks.ReadWrite.Shared",
];

export const getToken = ({
	code,
	redirectUrl,
}: { code: string; redirectUrl: string }) =>
	axios.post(
		`${MSAuthUrl}/${TenantId}/oauth2/v2.0/token`,
		{
			tenant: TenantId,
			client_id: ClientId,
			scope: Scopes.join(" "),
			code,
			redirect_uri: redirectUrl,
			grant_type: "authorization_code",
		},
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Origin: "",
			},
		},
	);
