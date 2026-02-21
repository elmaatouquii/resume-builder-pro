import { useResume } from "../../context/ResumeContext";
import { Input, Textarea, Card, SectionHeader, ItemCard } from "../ui";

export default function ProjectsEditor() {
  const { data, addItem, updateItem, removeItem } = useResume();

  const updateTechs = (id, rawValue) => {
    updateItem("projects", id, "technologies", rawValue.split(",").map(s => s.trim()).filter(Boolean));
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Projects"
        icon="🚀"
        count={data.projects.length}
        onAdd={() => addItem("projects")}
        addLabel="Add Project"
      />

      {data.projects.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-4xl mb-2">🚀</p>
          <p className="text-sm text-zinc-500">No projects added yet.</p>
        </Card>
      )}

      {data.projects.map(proj => (
        <ItemCard key={proj.id} onDelete={() => removeItem("projects", proj.id)}>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Project Name" value={proj.name} onChange={v => updateItem("projects", proj.id, "name", v)} placeholder="My Awesome Project" className="col-span-2 sm:col-span-1" />
            <Input label="Your Role" value={proj.role} onChange={v => updateItem("projects", proj.id, "role", v)} placeholder="Lead Developer" className="col-span-2 sm:col-span-1" />
            <Input label="URL (optional)" value={proj.url} onChange={v => updateItem("projects", proj.id, "url", v)} placeholder="github.com/..." className="col-span-2" />
            <div className="col-span-2">
              <Textarea
                label="Description"
                value={proj.description}
                onChange={v => updateItem("projects", proj.id, "description", v)}
                placeholder="What you built, key features, impact..."
                rows={3}
              />
            </div>
            <Input
              label="Technologies (comma-separated)"
              value={(proj.technologies || []).join(", ")}
              onChange={v => updateTechs(proj.id, v)}
              placeholder="React, Node.js, PostgreSQL"
              className="col-span-2"
            />
          </div>
        </ItemCard>
      ))}
    </div>
  );
}
