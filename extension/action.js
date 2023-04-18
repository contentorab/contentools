chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.windows.create({
      url: "/dist/index.html?tabId=" + activeTab.id,
      type: "popup",
      height: 600,
      width: 400,
      top: 100,
      left: 200,
    });
  });
});
