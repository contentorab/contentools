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
  } else if (request.type === "job-count-words-reference") {
    const reference = document
      .querySelector("#_imgNotesInfo")
      .parentElement.querySelector("span").innerText;
    chrome.runtime.sendMessage({
      type: "job-count-words-reference",
      payload: reference,
    });
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWordCountToTranslate() {
  const notOnJobTab =
    document.querySelector("a.rtsLink.rtsSelected").innerText !== "5. Jobs";

  if (notOnJobTab) {
    chrome.runtime.sendMessage({
      type: "job-count-words-wrong-page",
    });
    document.querySelector(".rtsLI:nth-child(5) > a").click();
    return;
  }

  const extracted = [];

  for (const row of document.querySelectorAll("#divFilterResults tbody > tr")) {
    document
      .querySelector(
        ".RadToolTip.RadToolTip_Telerik .rtWrapper .rtWrapperContent > div > div"
      )
      ?.remove();
    if (row.querySelector("td:nth-child(7)").innerText == 0) {
      continue;
    }

    const paragraphSpans = row.querySelectorAll("td:nth-child(3) > span");
    const paragraphs =
      paragraphSpans.length > 2 ? paragraphSpans[1].innerText : "";

    const supplierMatch = row.querySelectorAll("td:nth-child(5) > a");
    const supplier = `${supplierMatch[0].innerText} - ${
      supplierMatch[1].innerText ? "accepted" : ""
    }`;

    row.querySelector("td:nth-child(8) > img:last-child").click();
    let popupLoaded = null;

    while (!popupLoaded) {
      await sleep(10);
      popupLoaded = !!document.querySelector(
        ".RadToolTip .rtWrapperContent table:nth-child(3) tr > td:last-child"
      );
    }

    const titleHtml = row.querySelector("td:nth-child(4)").innerHTML;

    const totalWordsTd =
      document.querySelector(
        ".RadToolTip .rtWrapperContent table:nth-child(4) tr > td:last-child"
      ) ||
      document.querySelector(
        ".RadToolTip .rtWrapperContent table:nth-child(3) tr > td:last-child"
      );
    const totalWords = Number(totalWordsTd.innerText.match(/\((\d+) \w*\)/)[1]);
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
      job: titleHtml,
      total: totalWords,
      toTranslate: totalWordsToTranslate,
      diff: wordDiffCount,
      paragraphs,
      supplier,
    });
  }

  chrome.runtime.sendMessage({
    type: "job-count-words",
    payload: extracted,
  });

  try {
    document.querySelector(
      ".RadToolTip.RadToolTip_Telerik .rtWrapper .rtWrapperContent"
    ).innerHTML = `
      <div style="margin-top: 50px; display: flex; justify-content: center; align-items: center;">
      <h2>Calculation complete</h2>
      </div>`;
  } catch {
    chrome.runtime.sendMessage({
      type: "job-count-words-wrong-page",
    });
  }
}
