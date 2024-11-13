/** update task num to badge */
export function updateBadge(taskNum: number) {
  chrome.action.setBadgeText({
    text: String(taskNum),
  });
}
