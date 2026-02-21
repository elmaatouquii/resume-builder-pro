import { useResume } from "../../context/ResumeContext";
import { Input, Textarea, Toggle, Card, SectionHeader, ItemCard } from "../ui";

export default function ExperienceEditor() {
  const { data, addItem, updateItem, removeItem } = useResume();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Work Experience"
        icon="💼"
        count={data.experience.length}
        onAdd={() => addItem("experience")}
        addLabel="Add Job"
      />

      {data.experience.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-4xl mb-2">💼</p>
          <p className="text-sm text-zinc-500">No experience added yet.</p>
        </Card>
      )}

      {data.experience.map((exp, idx) => (
        <ItemCard key={exp.id} onDelete={() => removeItem("experience", exp.id)}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-sky-100 dark:bg-sky-900/30 text-sky-600 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</div>
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 truncate">
              {exp.role || exp.company || "New Position"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Company" value={exp.company} onChange={v => updateItem("experience", exp.id, "company", v)} placeholder="Company Name" className="col-span-2 sm:col-span-1" />
            <Input label="Role / Title" value={exp.role} onChange={v => updateItem("experience", exp.id, "role", v)} placeholder="Job Title" className="col-span-2 sm:col-span-1" />
            <Input label="Location" value={exp.location} onChange={v => updateItem("experience", exp.id, "location", v)} placeholder="City, Country" className="col-span-2 sm:col-span-1" />
            <div className="col-span-2 sm:col-span-1 flex items-end">
              <Toggle
                checked={exp.current}
                onChange={v => updateItem("experience", exp.id, "current", v)}
                label="Currently working here"
              />
            </div>
            <Input label="Start Date" type="month" value={exp.startDate} onChange={v => updateItem("experience", exp.id, "startDate", v)} />
            {!exp.current && (
              <Input label="End Date" type="month" value={exp.endDate} onChange={v => updateItem("experience", exp.id, "endDate", v)} />
            )}
          </div>

          <div className="mt-3">
            <Textarea
              label="Description"
              value={exp.description}
              onChange={v => updateItem("experience", exp.id, "description", v)}
              placeholder="Describe your responsibilities, achievements, and impact..."
              rows={3}
            />
          </div>
        </ItemCard>
      ))}
    </div>
  );
}
