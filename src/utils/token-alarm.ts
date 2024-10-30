import { acquireToken } from "@/auth/ms-oauth";

import { StorageKey, storageSet } from "./storage";

export const RefreshTokenAlarmName = "refresh-access-token";

/**
 * 定时刷新 access token
 */
export class TokenAlarm {
  constructor() {
    chrome.alarms.onAlarm.addListener(this.handleAlarm);
  }

  async handleAlarm(alarm: chrome.alarms.Alarm) {
    if (alarm.name === RefreshTokenAlarmName) {
      const res = await acquireToken();

      if (res?.accessToken) {
        storageSet({
          [StorageKey.AccessToken]: res.accessToken,
        });
      }
    }
  }

  create() {
    chrome.alarms.create(RefreshTokenAlarmName, {
      delayInMinutes: 50,
      periodInMinutes: 50,
    });
  }

  remove() {
    chrome.alarms.clear(RefreshTokenAlarmName);
  }
}
