console.log("Injected Contentools script");

const storage = {
  async get(id) {
    return await chrome.storage.sync.get(id);
  },
  async set(id, data) {
    return await chrome.storage.sync.set({ [id]: data });
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWordCountToTranslate(port) {
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

    const segments = parseInt(
      row.querySelector(".col_seg.comments")?.innerText.replace(/\s/g, "")
    );

    if (segments == 0) {
      continue;
    }

    const paragraphs =
      row.querySelector(".col_doc > .small")?.innerText.slice(2) ?? "";

    const supplierMatch = row.querySelectorAll(".col_assignment > a");
    const supplier = `${supplierMatch[0].innerText} - ${
      supplierMatch[1].innerText ? "accepted" : ""
    }`;

    row.querySelector("img[onclick*='return showDocProgressTooltip']").click();
    let popupLoaded = null;

    while (!popupLoaded) {
      await sleep(10);
      popupLoaded = !!document.querySelector(
        ".RadToolTip .rtWrapperContent table:nth-child(3) tr > td:last-child"
      );
    }

    const titleHtml = row.querySelector(".col_tskt").innerHTML;

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
      segments,
    });
  }

  port.postMessage({
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

if (location.pathname.includes("/Codyt/Project/ManageItems")) {
  function connectExtension() {
    console.log("Connecting to extension");
    const port = chrome.runtime.connect({
      name: "jobs",
    });
    port.onDisconnect.addListener(function () {
      setTimeout(connectExtension, 1000);
    });

    port.onMessage.addListener(async function (request) {
      console.log("request", request);
      if (request.type === "job-count-words") {
        getWordCountToTranslate(port);
      } else if (request.type === "job-count-words-reference") {
        const reference = document
          .querySelector("#_imgNotesInfo")
          .parentElement.querySelector("span").innerText;
        port.postMessage({
          type: "job-count-words-reference",
          payload: reference,
        });
      }
    });
  }
  connectExtension();
}

if (location.pathname.includes("/Financial/Invoice/Edit")) {
  const port = chrome.runtime.connect({
    name: "invoice",
  });
  port.onDisconnect.addListener(function () {
    console.log("onDisconnect");
  });

  port.onMessage.addListener(function (request) {
    console.log("request", request);
    if (request.type === "job-invoice-paste-description") {
      putCopiedInvoiceDescription(request.payload);
    } else if (request.type === "job-invoice-paste-quantity") {
      putCopiedInvoiceNumber(request.payload);
    }
  });
}

function putCopiedInvoiceDescription(description) {
  if (!location.pathname.includes("/Financial/Invoice/Edit")) return;

  const descInput = document.querySelector('textarea[data-bind="value: desc"]');
  descInput.value = description;

  const changeEvent = new Event("change");
  setTimeout(() => descInput.dispatchEvent(changeEvent), 5);
}

function putCopiedInvoiceNumber(number) {
  console.log("putCopiedInvoiceNumber", number);
  if (!location.pathname.includes("/Financial/Invoice/Edit")) return;

  if (
    document.querySelector("input[data-bind*=enableQuantity]").checked == false
  ) {
    document.querySelector("input[data-bind*=enableQuantity]").click();
  }

  const kInput = document.querySelector(
    "td[data-bind*=enableQuantity] input.k-formatted-value.k-input"
  );
  const updateInput = document.querySelector(
    "td[data-bind*=enableQuantity] input[data-bind*=updateTotal]"
  );

  kInput.value = number;
  updateInput.value = number;

  const changeEvent = new Event("change");
  setTimeout(() => kInput.dispatchEvent(changeEvent), 5);
  setTimeout(() => updateInput.dispatchEvent(changeEvent), 5);
}
