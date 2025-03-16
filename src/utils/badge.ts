/** update task num to badge */
export function updateBadge(taskNum: number | string) {
  chrome.action.setBadgeText({
    text: typeof taskNum === "string" ? taskNum : String(taskNum),
  });
}
