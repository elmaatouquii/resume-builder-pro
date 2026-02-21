import { useResume } from "../../context/ResumeContext";
import { Input, Select, Card, SectionHeader, ItemCard, StarRating } from "../ui";

const CATEGORIES = ["Design", "Development", "Research", "Management", "Marketing", "Data", "Communication", "General"];

export default function SkillsEditor() {
  const { data, addItem, updateItem, removeItem } = useResume();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Skills"
        icon="⚡"
        count={data.skills.length}
        onAdd={() => addItem("skills")}
        addLabel="Add Skill"
      />

      {data.skills.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-4xl mb-2">⚡</p>
          <p className="text-sm text-zinc-500">No skills added yet.</p>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-2">
        {data.skills.map(skill => (
          <ItemCard key={skill.id} onDelete={() => removeItem("skills", skill.id)}>
            <div className="flex items-center gap-3">
              <Input
                value={skill.name}
                onChange={v => updateItem("skills", skill.id, "name", v)}
                placeholder="Skill name"
                className="flex-1 min-w-0"
              />
              <Select
                value={skill.category}
                onChange={v => updateItem("skills", skill.id, "category", v)}
                options={CATEGORIES}
                className="w-32 shrink-0"
              />
              <div className="shrink-0">
                <StarRating
                  value={skill.level}
                  onChange={v => updateItem("skills", skill.id, "level", v)}
                />
              </div>
            </div>
          </ItemCard>
        ))}
      </div>

      {data.skills.length > 0 && (
        <p className="text-xs text-zinc-400 text-center">Squares indicate proficiency level (1–5)</p>
      )}
    </div>
  );
}
