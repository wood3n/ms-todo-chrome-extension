/**
 * @file https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/msal-browser-samples/ChromiumExtensionSample/auth.js
 */
import { PublicClientApplication } from "@azure/msal-browser";

import { launchWebAuthFlow, RedirectUri } from "./chrome-identity";

export const TenantId = "057ab151-e7cd-45a5-8655-4303bf366831";

export const ClientId = "e5da5554-682a-4a9f-ac32-c1a741b6050c";

export const ClientSecret = "BRd8Q~sIntfeaIMSPdo~UiiFeseIS5deQ26s6bAo";

/**
 * https://learn.microsoft.com/zh-cn/graph/permissions-reference
 */
export const Scopes = ["User.Read", "Tasks.Read", "Tasks.Read.Shared", "Tasks.ReadWrite", "Tasks.ReadWrite.Shared"];

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: ClientId,
    authority: "https://login.microsoftonline.com/common/",
    redirectUri: RedirectUri,
    postLogoutRedirectUri: RedirectUri,
  },
  cache: {
    cacheLocation: "localStorage",
  },
});

export async function getLoginInUrl() {
  return new Promise<string>((resolve) => {
    msalInstance.loginRedirect({
      scopes: Scopes,
      onRedirectNavigate: (url) => {
        resolve(url);
        return false;
      },
    });
  });
}

export async function getLoginOutUrl() {
  return new Promise<string>((resolve, reject) => {
    msalInstance
      .logoutRedirect({
        onRedirectNavigate: (url) => {
          resolve(url);
          return false;
        },
      })
      .catch(reject);
  });
}

/**
 * refresh token
 */
export async function acquireToken() {
  return msalInstance.acquireTokenSilent({
    scopes: ["user.read"],
    account: msalInstance.getAllAccounts()[0],
  })
    .catch(async (error) => {
      console.error(error);
      const acquireTokenUrl = await getAcquireTokenUrl();

      return launchWebAuthFlow(acquireTokenUrl);
    });
}

async function getAcquireTokenUrl() {
  return new Promise<string>((resolve, reject) => {
    msalInstance.acquireTokenRedirect({
      scopes: ["user.read"],
      account: msalInstance.getAllAccounts()[0],
      onRedirectNavigate: (url) => {
        resolve(url);
        return false;
      },
    }).catch(reject);
  });
}
