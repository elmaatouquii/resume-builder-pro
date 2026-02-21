import { useResume } from "../../context/ResumeContext";
import { ACCENT_COLORS } from "../../utils/helpers";

const NAV_ITEMS = [
  { id: "personal", icon: "👤", label: "Personal" },
  { id: "experience", icon: "💼", label: "Experience" },
  { id: "education", icon: "🎓", label: "Education" },
  { id: "skills", icon: "⚡", label: "Skills" },
  { id: "projects", icon: "🚀", label: "Projects" },
  { id: "languages", icon: "🌐", label: "Languages" },
  { id: "certifications", icon: "🏆", label: "Certifications" },
  { id: "sections", icon: "⚙️", label: "Layout" },
];

export default function EditorNav() {
  const { activeSection, setActiveSection, settings, updateSettings, toggleSection } = useResume();

  return (
    <aside className="w-56 shrink-0 flex flex-col gap-1 pt-2">
      <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-3 mb-2">Sections</p>
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeSection === item.id
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700"
              : "text-zinc-500 dark:text-zinc-400 hover:bg-white/70 dark:hover:bg-zinc-800/70 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          <span className="text-base">{item.icon}</span>
          {item.label}
        </button>
      ))}

      {/* Color picker */}
      <div className="mt-4 px-3">
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-3">Accent</p>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map(c => (
            <button
              key={c.value}
              onClick={() => updateSettings("accentColor", c.value)}
              title={c.label}
              className={`w-6 h-6 rounded-full ring-offset-2 ring-offset-slate-100 dark:ring-offset-zinc-950 transition-all ${settings.accentColor === c.value ? "ring-2 ring-zinc-400 scale-110" : "hover:scale-110"}`}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
