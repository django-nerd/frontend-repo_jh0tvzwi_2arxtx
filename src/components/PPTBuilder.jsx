import { useState } from "react";
import PptxGenJS from "pptxgenjs";

const sections = [
  { key: "title", title: "標題", placeholder: "花東青草藥文化：民間智慧的傳承與在地知識的再認識" },
  { key: "abstract", title: "摘要", placeholder: "研究動機、目的與方法概述" },
  { key: "motivation", title: "研究動機與背景", placeholder: "花東地區多樣性與青草藥文化背景" },
  { key: "method", title: "研究方法", placeholder: "訪談對象、取樣方式、資料蒐集與倫理" },
  { key: "participants", title: "受訪者介紹", placeholder: "王裕德、王勇伯的背景與專長" },
  { key: "features", title: "青草藥文化特色", placeholder: "生活化、信仰結合、口耳相傳" },
  { key: "reflection", title: "訪談心得與反思", placeholder: "自主學習、信仰框架、傳承脆弱與契機" },
  { key: "conclusion", title: "結論與建議", placeholder: "結論摘要與行動建議" }
];

export default function PPTBuilder({ preset }) {
  const [data, setData] = useState(() => ({
    title: preset?.title || sections[0].placeholder,
    abstract: preset?.abstract || "",
    motivation: preset?.motivation || "",
    method: preset?.method || "",
    participants: preset?.participants || "",
    features: preset?.features || "",
    reflection: preset?.reflection || "",
    conclusion: preset?.conclusion || ""
  }));

  const [theme, setTheme] = useState("jade");
  const [fontSize, setFontSize] = useState(18);

  const handleChange = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const buildPPT = async () => {
    const pptx = new PptxGenJS();

    const themes = {
      jade: { bg: "#073b3a", fg: "#f1fff7", accent: "#2a9d8f" },
      earth: { bg: "#2b2d42", fg: "#edf2f4", accent: "#8d99ae" },
      leaf: { bg: "#0b3d20", fg: "#efffed", accent: "#7fb069" }
    };

    const t = themes[theme];
    pptx.layout = "LAYOUT_16x9";

    // Title slide
    let slide = pptx.addSlide({ bkgd: t.bg });
    slide.addText(data.title || sections[0].placeholder, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 2,
      color: t.fg,
      fontSize: 40,
      bold: true,
      align: "center"
    });
    slide.addText("花東青草藥文化——民間智慧的傳承", {
      x: 0.5,
      y: 3.4,
      w: 9,
      color: t.accent,
      fontSize: 18,
      align: "center"
    });

    const addBulletsSlide = (title, content) => {
      const s = pptx.addSlide({ bkgd: t.bg });
      s.addText(title, { x: 0.5, y: 0.6, w: 9, color: t.fg, fontSize: 28, bold: true });
      const bullets = (content || "").split(/\n|\u3001|\;|\。/).filter(Boolean).map((v) => v.trim());
      s.addText(bullets.length ? bullets : ["(尚未填寫)"], {
        x: 0.7,
        y: 1.2,
        w: 8.6,
        h: 4.8,
        color: t.fg,
        fontSize,
        bullet: true,
        lineSpacing: 20
      });
      return s;
    };

    addBulletsSlide("摘要", data.abstract);
    addBulletsSlide("研究動機與背景", data.motivation);
    addBulletsSlide("研究方法", data.method);
    addBulletsSlide("受訪者介紹", data.participants);
    addBulletsSlide("青草藥文化的特色", data.features);
    addBulletsSlide("訪談心得與反思", data.reflection);
    addBulletsSlide("結論與建議", data.conclusion);

    await pptx.writeFile({ fileName: "花東青草藥文化_簡報.pptx" });
  };

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s) => (
            <div key={s.key} className="flex flex-col gap-2">
              <label className="text-sm text-blue-200/80">{s.title}</label>
              <textarea
                className="min-h-[100px] rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 focus:outline-none p-3 text-blue-50 placeholder:text-blue-200/40"
                placeholder={s.placeholder}
                value={data[s.key]}
                onChange={(e) => handleChange(s.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-blue-200/80 text-sm">主題</span>
            <select
              className="bg-slate-900/60 border border-slate-700 rounded-md p-2 text-blue-50"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="jade">翠玉綠</option>
              <option value="earth">靜謐灰</option>
              <option value="leaf">森綠</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-blue-200/80 text-sm">字級</span>
            <input
              type="range"
              min={14}
              max={26}
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
            <span className="text-blue-200/80 text-sm w-6">{fontSize}</span>
          </div>

          <button
            onClick={buildPPT}
            className="ml-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition"
          >
            下載PPT
          </button>
        </div>
      </div>
    </div>
  );
}
