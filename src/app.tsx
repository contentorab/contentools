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
}

export function App() {
  const tabId = Number(new URLSearchParams(location.search).get('tabId'));
  const contentResponse = useSignal<IJobWordCount[]>([]);
  const filterJob = useSignal("");

  const filteredContent = useComputed(() => contentResponse.value.filter(({job}) => job.toLocaleLowerCase().includes(filterJob.value.toLocaleLowerCase())))

  const ContentList = () => {
    const clickHandler: JSXInternal.MouseEventHandler<HTMLDivElement> = e => {
      const target = e.target as HTMLSpanElement
      const span = target.closest('span.copy')
      navigator.clipboard.writeText(span?.innerHTML!)
    }
    return (
      <div onClick={clickHandler}>
        {filteredContent.value.map(({job, total, toTranslate, diff}: IJobWordCount) => (
          <div class="extracted-word-count">
            <h3>{job}</h3>
            <p><span>Total words:</span><span title="copy" class="copy">{total}</span></p>
            <p><span>Total words to translate:</span><span title="copy" class="copy">{toTranslate}</span></p>
            <p><span>Word diff:</span><span title="copy" class="copy">{diff}</span></p>
          </div>
        ))}
      </div>
    )
  }

  async function sendMessageToTab(data: IMessage) {
    chrome.tabs.sendMessage(tabId, data)
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "job-count-words") {
      contentResponse.value = request.payload
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
        marginTop: "10px"
      }}>Contentools</h1>
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <div>
          <h3>Extract word count</h3>
          <button onClick={async () => { 
            sendMessageToTab({
              type: "job-count-words"
            });
          }}>
            Extract jobs word count
          </button>
        </div>
      </div>
      {contentResponse.value.length > 0 ? (
        <div style={{position: "sticky", backgroundColor: "white", zIndex: 5, top: 0, padding: "0.5rem 0"}}>
          <input value={filterJob.value} onInput={(e) => { 
            filterJob.value = (e.target as HTMLInputElement).value
          }} type="text" placeholder="filter job" style={{width: "100%"}} />
        </div>
      ) : ""}
      <p>
        <ContentList />
      </p>
    </div>
  )
}
