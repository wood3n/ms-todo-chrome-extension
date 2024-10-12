import type { AuthenticationResult } from "@azure/msal-browser";

import { msalInstance } from "./ms-oauth";

/**
 * https://developer.chrome.com/docs/extensions/reference/api/identity?hl=zh-cn#method-getRedirectURL
 */
export const RedirectUri = typeof chrome !== "undefined" && chrome.identity ? chrome.identity.getRedirectURL() : `${window.location.origin}/popup.html`;

/**
 * https://developer.chrome.com/docs/extensions/reference/api/identity?hl=zh-cn#method-launchWebAuthFlow
 */
export function launchWebAuthFlow(url: string) {
  return new Promise<AuthenticationResult | null>((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        interactive: true,
        url,
      },
      async (responseUrl) => {
        // Response urls includes a hash (login, acquire token calls)
        if (responseUrl?.includes("#")) {
          await msalInstance.initialize();

          msalInstance
            .handleRedirectPromise(`#${responseUrl.split("#")[1]}`)
            .then(resolve)
            .catch(reject);
        }
        else {
          // Logout calls
          resolve(null);
        }
      },
    );
  });
}
