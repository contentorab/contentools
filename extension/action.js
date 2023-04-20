let vid = 0;

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
        vid = window.id;
      }
    );
  });
}

chrome.action.onClicked.addListener((tab) => {
  chrome.windows.get(vid, function () {
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
