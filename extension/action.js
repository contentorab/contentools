chrome.action.onClicked.addListener((tab) => {
  // chrome.windows.get(1234, function (chromeWindow) {
  //   if (!chrome.runtime.lastError && chromeWindow) {
  //     chrome.windows.update(1234, { focused: true });
  //     return;
  //   }
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.windows.create({
      // tabId: 1234,
      url: "/dist/index.html?tabId=" + activeTab.id,
      type: "popup",
      height: 600,
      width: 400,
      // focused: true,
    });
  });
});
// });
