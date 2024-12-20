// chrome.runtime.onInstalled.addListener(async () => {
//   chrome.contextMenus.create({
//     id: "add",
//     title: "添加到Todo",
//     type: "normal",
//     contexts: ["selection"],
//   });
// });

/** open side panel */
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch(error => console.error(error));
