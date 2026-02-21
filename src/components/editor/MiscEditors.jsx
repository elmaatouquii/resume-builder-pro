import { useResume } from "../../context/ResumeContext";
import { Input, Select, Card, SectionHeader, ItemCard } from "../ui";
import { LANGUAGE_LEVELS } from "../../utils/helpers";

export function LanguagesEditor() {
  const { data, addItem, updateItem, removeItem } = useResume();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Languages"
        icon="🌐"
        count={data.languages.length}
        onAdd={() => addItem("languages")}
        addLabel="Add Language"
      />

      {data.languages.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-4xl mb-2">🌐</p>
          <p className="text-sm text-zinc-500">No languages added yet.</p>
        </Card>
      )}

      {data.languages.map(lang => (
        <ItemCard key={lang.id} onDelete={() => removeItem("languages", lang.id)}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Language"
              value={lang.name}
              onChange={v => updateItem("languages", lang.id, "name", v)}
              placeholder="English"
            />
            <Select
              label="Proficiency"
              value={lang.level}
              onChange={v => updateItem("languages", lang.id, "level", v)}
              options={LANGUAGE_LEVELS}
            />
          </div>
        </ItemCard>
      ))}
    </div>
  );
}

export function CertificationsEditor() {
  const { data, addItem, updateItem, removeItem } = useResume();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Certifications"
        icon="🏆"
        count={data.certifications.length}
        onAdd={() => addItem("certifications")}
        addLabel="Add Certificate"
      />

      {data.certifications.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-4xl mb-2">🏆</p>
          <p className="text-sm text-zinc-500">No certifications added yet.</p>
        </Card>
      )}

      {data.certifications.map(cert => (
        <ItemCard key={cert.id} onDelete={() => removeItem("certifications", cert.id)}>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Certificate Name" value={cert.name} onChange={v => updateItem("certifications", cert.id, "name", v)} placeholder="AWS Solutions Architect" className="col-span-2" />
            <Input label="Issuing Organization" value={cert.issuer} onChange={v => updateItem("certifications", cert.id, "issuer", v)} placeholder="Amazon Web Services" />
            <Input label="Date" type="month" value={cert.date} onChange={v => updateItem("certifications", cert.id, "date", v)} />
          </div>
        </ItemCard>
      ))}
    </div>
  );
}
