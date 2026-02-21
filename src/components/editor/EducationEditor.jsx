import { useResume } from "../../context/ResumeContext";
import { Input, Textarea, Card, SectionHeader, ItemCard } from "../ui";

export default function EducationEditor() {
  const { data, addItem, updateItem, removeItem } = useResume();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Education"
        icon="🎓"
        count={data.education.length}
        onAdd={() => addItem("education")}
        addLabel="Add Education"
      />

      {data.education.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-4xl mb-2">🎓</p>
          <p className="text-sm text-zinc-500">No education added yet.</p>
        </Card>
      )}

      {data.education.map((edu, idx) => (
        <ItemCard key={edu.id} onDelete={() => removeItem("education", edu.id)}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</div>
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 truncate">
              {edu.institution || "New Institution"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Institution" value={edu.institution} onChange={v => updateItem("education", edu.id, "institution", v)} placeholder="University Name" className="col-span-2" />
            <Input label="Degree" value={edu.degree} onChange={v => updateItem("education", edu.id, "degree", v)} placeholder="Bachelor of Science" />
            <Input label="Field of Study" value={edu.field} onChange={v => updateItem("education", edu.id, "field", v)} placeholder="Computer Science" />
            <Input label="Start Date" type="month" value={edu.startDate} onChange={v => updateItem("education", edu.id, "startDate", v)} />
            <Input label="End Date" type="month" value={edu.endDate} onChange={v => updateItem("education", edu.id, "endDate", v)} />
            <Input label="GPA (optional)" value={edu.gpa} onChange={v => updateItem("education", edu.id, "gpa", v)} placeholder="3.8" className="col-span-2" />
          </div>
          <div className="mt-3">
            <Textarea
              label="Additional Info"
              value={edu.description}
              onChange={v => updateItem("education", edu.id, "description", v)}
              placeholder="Thesis, honors, relevant coursework..."
              rows={2}
            />
          </div>
        </ItemCard>
      ))}
    </div>
  );
}
