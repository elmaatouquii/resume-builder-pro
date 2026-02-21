import { useResume } from "../../context/ResumeContext";
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
};

export default function PreviewPanel() {
  const { data, settings } = useResume();
  const Template = TEMPLATES[settings.template] || ModernTemplate;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          Live Preview
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-zinc-400">A4 · PDF ready</span>
        </div>
      </div>

      {/* Scrollable area */}
      <div className="flex-1 overflow-auto bg-zinc-300 dark:bg-zinc-900 p-5">
        {/*
          ── The capture target ──────────────────────────────────────────────
          id="resume-preview-canvas" is what html2canvas will screenshot.

          IMPORTANT: we do NOT use minHeight here — the export hook will
          temporarily strip it before capture anyway, but we also want the
          screen preview to look accurate (content-height only, no extra gap).

          For the screen preview we use a fixed A4 aspect ratio via
          aspect-ratio so the user can see how the page will look, but the
          inner template DIV controls the actual rendered height.
        */}
        <div
          id="resume-preview-canvas"
          className="mx-auto bg-white shadow-2xl"
          style={{
            width: "210mm",
            // Let content determine height on screen too — no minHeight trap
            height: "auto",
          }}
        >
          <Template data={data} settings={settings} />
        </div>

        {/* Faint A4 page-boundary guide line shown in preview only */}
        <div
          className="mx-auto mt-0 pointer-events-none"
          style={{ width: "210mm" }}
          title="A4 page boundary"
        >
          <div className="border-t-2 border-dashed border-red-300/40 mt-0 pt-1">
            <p className="text-center text-xs text-red-300/60 select-none">
              — A4 bottom boundary (297 mm) —
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
