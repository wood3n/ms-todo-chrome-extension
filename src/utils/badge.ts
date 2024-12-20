/** update task num to badge */
export function updateBadge(taskNum: number) {
  chrome.action.setBadgeText({
    text: String(taskNum),
  });
}

/** clear badge status */
export function clearBadge() {
  chrome.action.setBadgeText({
    text: "",
  });
}
