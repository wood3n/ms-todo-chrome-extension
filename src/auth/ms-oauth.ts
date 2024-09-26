import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { launchWebAuthFlow, RedirectUri } from "./chrome-identity";

/**
 * https://learn.microsoft.com/zh-cn/entra/identity-platform/v2-oauth2-auth-code-flow
 */
export const MSAuthUrl = "https://login.microsoftonline.com/consumers";

export const TenantId = "057ab151-e7cd-45a5-8655-4303bf366831";

export const ClientId = "e5da5554-682a-4a9f-ac32-c1a741b6050c";

/**
 * https://learn.microsoft.com/zh-cn/graph/permissions-reference
 */
export const Scopes = ["User.Read", "Tasks.Read", "Tasks.Read.Shared", "Tasks.ReadWrite", "Tasks.ReadWrite.Shared"];

export const msalInstance = new PublicClientApplication({
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
    iframeHashTimeout: 20000,
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
            break;

          default:
        }
      },
    },
  },
});

/**
 * 获取MS oauth登录授权的 url
 */
export async function getSignInUrl() {
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

/**
 * 获取退出验证重定向 url
 */
export async function getSignOutUrl() {
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

async function getAcquireTokenUrl() {
  return new Promise<string>((resolve, reject) => {
    msalInstance
      .acquireTokenRedirect({
        scopes: Scopes,
        onRedirectNavigate: (url) => {
          resolve(url);
          return false;
        },
      })
      .catch(reject);
  });
}

/**
 * 获取
 */
export async function acquireToken() {
  const account = msalInstance.getActiveAccount();

  if (!account) {
    throw new Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
  }

  try {
    const res = await msalInstance.acquireTokenSilent({
      scopes: Scopes,
      account,
    });

    return res?.accessToken;
  }
  catch (error) {
    console.error(error);
    const acquireTokenUrl = await getAcquireTokenUrl();

    launchWebAuthFlow(acquireTokenUrl);

    return null;
  }
}
