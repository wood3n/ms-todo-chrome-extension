/** create chrome notifications */
export function notify(title: string, message?: string) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "extension_icon@128px.png",
    title,
    message,
    priority: 2,
  });
}
