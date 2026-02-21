import { useState } from "react";
import { useResume } from "../../context/ResumeContext";
import { Card, Toggle } from "../ui";

const SECTION_META = {
  experience: { icon: "💼", label: "Work Experience" },
  education: { icon: "🎓", label: "Education" },
  skills: { icon: "⚡", label: "Skills" },
  projects: { icon: "🚀", label: "Projects" },
  languages: { icon: "🌐", label: "Languages" },
  certifications: { icon: "🏆", label: "Certifications" },
};

export default function SectionsEditor() {
  const { settings, reorderSections, toggleSection } = useResume();
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const handleDragStart = (e, id) => {
    setDragging(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (id !== dragging) setDragOver(id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (dragging === targetId) return;
    const arr = [...settings.sectionOrder];
    const fromIdx = arr.indexOf(dragging);
    const toIdx = arr.indexOf(targetId);
    arr.splice(fromIdx, 1);
    arr.splice(toIdx, 0, dragging);
    reorderSections(arr);
    setDragging(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-1">Layout & Visibility</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Drag to reorder sections in your resume. Toggle to show or hide.</p>
      </div>

      <div className="flex flex-col gap-2">
        {settings.sectionOrder.map(sectionId => {
          const meta = SECTION_META[sectionId];
          if (!meta) return null;
          const isHidden = settings.hiddenSections.includes(sectionId);
          const isDraggingThis = dragging === sectionId;
          const isDragTarget = dragOver === sectionId;

          return (
            <Card
              key={sectionId}
              className={`p-3 select-none transition-all ${isDraggingThis ? "opacity-40 scale-95" : ""} ${isDragTarget ? "ring-2 ring-sky-400 bg-sky-50/50 dark:bg-sky-900/10" : ""}`}
              draggable
              onDragStart={e => handleDragStart(e, sectionId)}
              onDragOver={e => handleDragOver(e, sectionId)}
              onDrop={e => handleDrop(e, sectionId)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex items-center gap-3">
                <div className="text-zinc-400 dark:text-zinc-500 cursor-grab active:cursor-grabbing text-sm select-none" title="Drag to reorder">⠿</div>
                <span className="text-lg">{meta.icon}</span>
                <span className={`flex-1 text-sm font-medium ${isHidden ? "text-zinc-400 line-through" : "text-zinc-700 dark:text-zinc-200"}`}>
                  {meta.label}
                </span>
                <Toggle
                  checked={!isHidden}
                  onChange={() => toggleSection(sectionId)}
                />
              </div>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-zinc-400 text-center">
        Drag the ⠿ handle to reorder · Toggle to show/hide sections
      </p>
    </div>
  );
}
