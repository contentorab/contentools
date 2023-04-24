function createWindow() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.windows.create(
      {
        url: "/dist/index.html?tabId=" + activeTab.id,
        type: "popup",
        height: 600,
        width: 400,
        focused: true,
      },
      (window) => {
        chrome.storage.sync.set({ vid: window.id });
      }
    );
  });
}

function openPopup() {
  chrome.storage.sync.get("vid", function ({ vid }) {
    chrome.windows.get(vid || 1, function () {
      if (chrome.runtime.lastError) {
        createWindow();
      } else {
        chrome.windows.update(vid, { focused: true });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          chrome.runtime.sendMessage({
            type: "job-count-words-tab-id",
            payload: activeTab.id,
          });
        });
      }
    });
  });
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "open-popup") {
    openPopup();
  }
});

chrome.action.onClicked.addListener((tab) => {
  openPopup();
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
  chrome.tabs.sendMessage(windowId, {
    type: "extension-id",
    payload: chrome.runtime.id,
  });
  chrome.runtime.sendMessage({
    type: "last-focused-window",
    payload: windowId,
  });
});
