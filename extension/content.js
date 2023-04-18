console.log("Injected Contentools script");

const storage = {
  async get(id) {
    return await chrome.storage.sync.get(id);
  },
  async set(id, data) {
    return await chrome.storage.sync.set({ [id]: data });
  },
};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "job-count-words") {
    getWordCountToTranslate();
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWordCountToTranslate() {
  const extracted = [];

  for (const row of document.querySelectorAll("#divFilterResults tbody > tr")) {
    document
      .querySelector(
        ".RadToolTip.RadToolTip_Telerik .rtWrapper .rtWrapperContent > div > div"
      )
      ?.remove();
    if (Number(row.querySelector("td:nth-child(7)").innerText) > 0) {
      row.querySelector("td:nth-child(8) > img:last-child").click();
      let popupLoaded = null;
      while (!popupLoaded) {
        await sleep(10);
        popupLoaded = !!document.querySelector(
          ".RadToolTip .rtWrapperContent table:nth-child(3) tr > td:last-child"
        );
      }
      const titleMatch =
        document.querySelector(
          ".RadToolTip .rtWrapperContent table:nth-child(2) td:last-child"
        ) ||
        document.querySelector(
          ".RadToolTip .rtWrapperContent table td:last-child"
        );
      const jobTitle = titleMatch.innerText;
      const totalWordsTd =
        document.querySelector(
          ".RadToolTip .rtWrapperContent table:nth-child(4) tr > td:last-child"
        ) ||
        document.querySelector(
          ".RadToolTip .rtWrapperContent table:nth-child(3) tr > td:last-child"
        );
      const totalWords = Number(
        totalWordsTd.innerText.match(/\((\d+) \w*\)/)[1]
      );
      const toTranslateMatchTd =
        document.querySelector(
          ".RadToolTip .rtWrapperContent table:nth-child(4) tr:nth-child(4) > td:last-child"
        ) ||
        document.querySelector(
          ".RadToolTip .rtWrapperContent table:nth-child(3) tr:nth-child(4) > td:last-child"
        );
      const toTranslateMatch =
        toTranslateMatchTd.innerText.match(/\((\d+) \w*\)/);
      const totalWordsToTranslate = toTranslateMatch
        ? Number(toTranslateMatch[1])
        : 0;
      const wordDiffCount = totalWords - totalWordsToTranslate;

      extracted.push({
        job: jobTitle,
        total: totalWords,
        toTranslate: totalWordsToTranslate,
        diff: wordDiffCount,
      });
    }
  }

  chrome.runtime.sendMessage({
    type: "job-count-words",
    payload: extracted,
  });

  document.querySelector(
    ".RadToolTip.RadToolTip_Telerik .rtWrapper .rtWrapperContent"
  ).innerHTML = `
    <div style="margin-top: 50px; display: flex; justify-content: center; align-items: center;">
      <h2>Extract complete</h2>
    </div>`;
}
