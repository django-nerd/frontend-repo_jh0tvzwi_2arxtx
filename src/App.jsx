import PPTBuilder from "./components/PPTBuilder";

const preset = {
  title: "花東青草藥文化：民間智慧的傳承與在地知識的再認識",
  abstract: "花東地區因地理與族群多樣性，孕育出豐富的青草藥知識體系。本文以半結構式訪談法，記錄兩位在地耆老——王裕德與王勇伯——對青草藥的理解與實踐，呈現草藥知識的生活性、信仰性與家族傳承特質。",
  motivation: "地理、氣候、族群多樣性；現代醫療普及下的知識斷層；保存與跨世代對話的必要性。",
  method: "訪談對象：王裕德、王勇伯\n取樣：家中長輩牽線\n資料：半結構式訪談、錄音逐字、主題分析\n倫理：告知同意、尊重表述",
  participants: "王裕德：自學、實作、辨識與配伍經驗\n王勇伯：信仰脈絡、神明教導、社群服務",
  features: "生活化：取材周遭、可近性\n信仰結合：祭儀、祈禱、身心靈整合\n口耳相傳：家族與社群為單位，缺乏文字記錄",
  reflection: "自主學習與地方實踐；信仰提供詮釋框架與社群信任；傳承的脆弱與活化契機；文化保存的倫理。",
  conclusion: "青草藥文化為民間智慧結晶；建議：建立植物誌與口述資料庫、教育課程、跨域合作、數位保存與安全聲明。"
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900">
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-5xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-emerald-100 tracking-tight mb-2">花東青草藥文化 簡報產生器</h1>
            <p className="text-emerald-200/80">將你的研究內容貼上，按一下即可生成PPT檔案</p>
          </div>

          <PPTBuilder preset={preset} />

          <div className="text-center text-sm text-emerald-200/60">
            下載檔案僅供學術與文化展示用途，不構成醫療建議。
          </div>
        </div>
      </div>
    </div>
  )
}

export default App