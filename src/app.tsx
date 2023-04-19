import { useSignal, useComputed } from "@preact/signals";
import { JSXInternal } from "preact/src/jsx";
import ReloadSVG from './assets/reload.svg';

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

export function App() {
  const tabId = Number(new URLSearchParams(location.search).get('tabId'));
  const contentResponse = useSignal<IJobWordCount[]>([]);
  const filterJob = useSignal("");
  const error = useSignal("");
  const reference = useSignal("");

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
      navigator.clipboard.writeText(span?.innerHTML!)
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

  async function sendMessageToTab(data: IMessage) {
    chrome.tabs.sendMessage(tabId, data)
  }

  sendMessageToTab({
    type: "job-count-words-reference"
  })

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "job-count-words") {
      contentResponse.value = request.payload;
      isCalculatingJobs = false;
    }
    else if (request.type === "job-count-words-reference") {
      reference.value = request.payload;
      document.title = `Contentools - ${request.payload}`;
    }
    else if (request.type === "job-count-words-wrong-page") {
      setTimeout(() => {
        sendMessageToTab({
          type: "job-count-words"
        });
      }, 1000);
      isCalculatingJobs = true;
    }
  });

  return (
    <div>
      <div class="reload-button" onClick={() => {
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
      <p>
        <ContentList />
      </p>
    </div>
  )
}
