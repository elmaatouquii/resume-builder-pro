import { ResumeProvider } from "./context/ResumeContext";
import Navbar from "./components/Navbar";
import EditorNav from "./components/editor/EditorNav";
import EditorPanel from "./components/editor/EditorPanel";
import PreviewPanel from "./components/preview/PreviewPanel";

function AppLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />

      {/* Main split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: nav + editor */}
        <div className="flex flex-col xl:flex-row flex-1 min-w-0 overflow-hidden border-r border-zinc-200 dark:border-zinc-800">
          {/* Section nav */}
          <div className="xl:h-full overflow-y-auto p-3 border-r border-zinc-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-950/50 shrink-0">
            <EditorNav />
          </div>

          {/* Editor content */}
          <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-zinc-950 p-4">
            <EditorPanel />
          </div>
        </div>

        {/* Right: preview (hidden on mobile) */}
        <div className="hidden lg:flex flex-col w-[680px] xl:w-[750px] shrink-0 bg-zinc-200 dark:bg-zinc-900 overflow-hidden">
          <PreviewPanel />
        </div>
      </div>

      {/* Mobile preview toggle */}
      <div className="lg:hidden fixed bottom-4 right-4">
        <a href="#preview" className="flex items-center gap-2 bg-sky-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-sky-500/30">
          👁 Preview
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <AppLayout />
    </ResumeProvider>
  );
}
