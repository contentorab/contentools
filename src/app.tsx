import { useEffect } from "preact/hooks";
import { useSignal, useComputed } from "@preact/signals";
import { JSXInternal } from "preact/src/jsx";
import ReloadSVG from './assets/reload.svg';
import OpenSVG from './assets/open.svg';

const storage = {
  async get(id: string) {
    return await chrome.storage.sync.get(id);
  },
  async set(id: string, data: any) {
    return await chrome.storage.sync.set({ [id]: data });
  },
};

interface IMessage {
  type: string;
  payload?: any;
}

interface IJobWordCount {
  job: string;
  total: number;
  toTranslate: number;
  diff: number;
  paragraphs: string;
  supplier: string;
}

let isCalculatingJobs = false

let extensionId = 0;

chrome.tabs.getCurrent(
  function(tab) {
    console.log('tab', tab);
    extensionId = tab?.windowId!   
  }
)

storage.set("extensionId", chrome.runtime.id)

export function App() {
  let tabId = Number(new URLSearchParams(location.search).get('tabId'));
  const contentResponse = useSignal<IJobWordCount[]>([]);
  const filterJob = useSignal("");
  const error = useSignal("");
  const reference = useSignal("");
  const lastFocusedWindow = useSignal(0);
  const jobsWindow = useSignal<chrome.runtime.Port | null>(null);
  const invoiceWindow = useSignal<chrome.runtime.Port | null>(null);
  const calculatedJobsTitle = useSignal("");
  const calculatedJobsTimestamp = useSignal("");

  useEffect(() => {
    storage.get("calculatedJobs").then(({calculatedJobs}) => {
      contentResponse.value = (calculatedJobs.jobs || []) as IJobWordCount[]
      calculatedJobsTitle.value = calculatedJobs.title
      calculatedJobsTimestamp.value = calculatedJobs.timestamp
    })

    chrome.runtime.onConnect.addListener(function(port) {
      console.log('connected', port);
      if (port.name == 'invoice') {
        invoiceWindow.value = port
      }
      else if (port.name == 'jobs') {
        jobsWindow.value = port
        sendMessageToTab({
          type: "job-count-words-reference"
        })

        port.onMessage.addListener(function(request) {
          console.log(request);
          
          if (request.type === "job-count-words") {
            console.log("job-count-words");
            
            contentResponse.value = request.payload;
            isCalculatingJobs = false;
            calculatedJobsTitle.value = reference.value;
            const now = new Date().toLocaleString();
            calculatedJobsTimestamp.value = now;
            storage.set("calculatedJobs", { 
              jobs: request.payload,
              title: reference.value,
              timestamp: now
            });
          }
          else if (request.type === "job-count-words-reference") {
            reference.value = request.payload;
            document.title = `Contentools - ${request.payload}`;
          }
          else if (request.type === "last-focused-window") {
            if (extensionId == request.payload || request.payload < 1) return;
            lastFocusedWindow.value = request.payload;
          }
          else if (request.type === "job-count-words-tab-id") {
            tabId = Number(request.payload);
            sendMessageToTab({
              type: "job-count-words-reference"
            })
          }
          else if (request.type === "job-count-words-wrong-page") {
            setTimeout(() => {
              sendMessageToTab({
                type: "job-count-words"
              });
            }, 1000);
            isCalculatingJobs = true;
          }
        })
      }
      port.onDisconnect.addListener(function() {
        console.log('onDisconnect');
      })
    })
  }, [])

  const searchFilter = (text: string, term: string) => text.toLocaleLowerCase().includes(term.toLocaleLowerCase())

  const filteredContent = useComputed(() => contentResponse.value.filter(({job, supplier}) => {
    const negativeSearch = filterJob.value.startsWith("-");
    const searchWords = negativeSearch 
      ? filterJob.value.slice(1).trim().split(" ") 
      : filterJob.value.trim().split(" ");
    
    const matchJob = negativeSearch 
      ? searchWords.filter(Boolean).some(word => searchFilter(job, word)) 
      : searchWords.filter(Boolean).every(word => searchFilter(job, word));
    const matchSupplier = searchFilter(supplier, searchWords[0]);

    return negativeSearch 
      ? (searchWords.filter(Boolean).length === 0 || (!matchJob && !matchSupplier)) 
      : (matchJob || matchSupplier)
  }))

  const ContentList = () => {
    const clickHandler: JSXInternal.MouseEventHandler<HTMLDivElement> = e => {
      const target = e.target as HTMLSpanElement
      const span = target.closest('span.copy')
      const value = span?.innerHTML!;
      navigator.clipboard.writeText(value)

      if (value) {
        let pasteType = "job-invoice-paste-quantity"
        if (!Number(value)) {
          pasteType = "job-invoice-paste-description"
        }
        
        invoiceWindow.value?.postMessage({
          type: pasteType,
          payload: value
        });
      }
    }
    return (
      <div onClick={clickHandler}>
        {filteredContent.value.map(({job, total, toTranslate, diff, paragraphs, supplier}: IJobWordCount) => (
          <div class="extracted-word-count">
            <h3 dangerouslySetInnerHTML={{ __html: job}}></h3>
            <p><span>Total words:</span><span title="copy" class="copy">{total}</span></p>
            <p><span>Total words to translate:</span><span title="copy" class="copy">{toTranslate}</span></p>
            <p><span>Word diff:</span><span title="copy" class="copy">{diff}</span></p>
            <p class="blue"><span title="copy" class="copy">{paragraphs.replace(" only", "")}</span></p>
            <p><span>Supplier:</span><span class="violet">{supplier}</span></p>
          </div>
        ))}
      </div>
    )
  }

  async function sendMessageToTab(data: IMessage, tid = 0) {
    jobsWindow.value?.postMessage(data)
  }

  return (
    <div>
      {!location.search.startsWith("?tabId=") ? <div title="open extension" class="open-button" onClick={() => {
        chrome.runtime.sendMessage({
          type: "open-popup",
        });
        window.close();
      }}>
        <img src={OpenSVG} />
      </div> : ""}
      <div title="reload extension" class="reload-button" onClick={() => {
        chrome.runtime.reload();
      }}>
        <img src={ReloadSVG} />
      </div>
      <h1 style={{
        minWidth: "250px",
        textAlign: "center",
        marginTop: "10px",
        marginBottom: 0,
      }}>Contentools</h1>
      <div style={{
        height: "1.5rem",
        textAlign: "center",
        color: "gray"
      }}>{reference}</div>
      <button style={{ width: "100%" }} onClick={async () => {
        error.value = ""
        if (isCalculatingJobs) return;
        sendMessageToTab({
          type: "job-count-words"
        });
        isCalculatingJobs = true;
      }}>
        Calculate jobs word count
      </button>
      {contentResponse.value.length > 0 ? (
        <div style={{position: "sticky", backgroundColor: "white", zIndex: 5, top: 0, padding: "0.5rem 0"}}>
          <input value={filterJob.value} type="search" onInput={(e) => { 
            filterJob.value = (e.target as HTMLInputElement).value
          }} placeholder="filter job" style={{width: "100%"}} />
        </div>
      ) : ""}
      {error.value && <p style={{margin: "0.5rem 0", textAlign: "center"}}>
        <strong class="red">{error}</strong>
      </p>}
      {calculatedJobsTitle && <div style={{
        marginBottom: "0.5rem",
        textAlign: "center",
        color: "gray"
      }}>
        <p>Saved list of - {calculatedJobsTitle}</p>
        <p>{calculatedJobsTimestamp}</p>
      </div>}
      <p>
        <ContentList />
      </p>
    </div>
  )
}

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
        chrome.storage.sync.set({ vid: window!.id });
      }
    );
  });
}

function openPopupWindow() {
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