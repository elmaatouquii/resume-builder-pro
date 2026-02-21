import { useResume } from "../context/ResumeContext";
import { usePdfExport } from "../hooks/usePdfExport.jsx";
import { Btn } from "./ui";
import ModernTemplate  from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

const TEMPLATES = {
  modern:  ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
};

export default function Navbar() {
  const { data, settings, updateSettings, clearAll } = useResume();
  const { exportPdf, exporting } = usePdfExport();

  const handleExport = () => {
    const Template = TEMPLATES[settings.template] || ModernTemplate;
    exportPdf(Template, data, settings, `resume-${Date.now()}.pdf`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md shadow-sky-500/30">R</div>
          <span className="font-display font-bold text-zinc-800 dark:text-zinc-100 text-lg tracking-tight hidden sm:block">
            Resume<span className="text-sky-500">Pro</span>
          </span>
        </div>

        {/* Template selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 hidden md:block">Template:</span>
          <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
            {["modern", "classic", "minimal"].map(t => (
              <button
                key={t}
                onClick={() => updateSettings("template", t)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all capitalize ${
                  settings.template === t
                    ? "bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateSettings("darkMode", !settings.darkMode)}
            title={settings.darkMode ? "Light mode" : "Dark mode"}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-lg"
          >
            {settings.darkMode ? "☀️" : "🌙"}
          </button>

          <Btn variant="ghost" size="sm" onClick={clearAll} title="Clear all data">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            <span className="hidden sm:inline">Clear</span>
          </Btn>

          <Btn
            variant="primary"
            size="md"
            onClick={handleExport}
            disabled={exporting}
            className="shadow-md shadow-sky-500/20"
          >
            {exporting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            )}
            {exporting ? "Generating PDF…" : "Export PDF"}
          </Btn>
        </div>
      </div>
    </header>
  );
}
