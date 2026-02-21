import { useResume } from "../../context/ResumeContext";
import { Input, Textarea, Card, SectionHeader } from "../ui";

export default function PersonalEditor() {
  const { data, updatePersonal } = useResume();
  const { personal } = data;

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Personal Information" icon="👤" />

      {/* Photo URL */}
      <Card className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
            {personal.photo
              ? <img src={personal.photo} alt="avatar" className="w-full h-full object-cover" onError={e => { e.target.style.display = "none"; }} />
              : <span className="text-2xl">🙂</span>}
          </div>
          <div className="flex-1">
            <Input
              label="Photo URL"
              value={personal.photo}
              onChange={v => updatePersonal("photo", v)}
              placeholder="https://example.com/photo.jpg"
            />
            <p className="text-xs text-zinc-400 mt-1">Paste a public image URL</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Input label="Full Name" value={personal.name} onChange={v => updatePersonal("name", v)} placeholder="Your Name" />
          <Input label="Professional Title" value={personal.title} onChange={v => updatePersonal("title", v)} placeholder="e.g. Senior Software Engineer" />
        </div>
      </Card>

      <Card className="p-4">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Contact</p>
        <div className="grid grid-cols-1 gap-3">
          <Input label="Email" type="email" value={personal.email} onChange={v => updatePersonal("email", v)} placeholder="you@email.com" />
          <Input label="Phone" type="tel" value={personal.phone} onChange={v => updatePersonal("phone", v)} placeholder="+1 (555) 000-0000" />
          <Input label="Location" value={personal.location} onChange={v => updatePersonal("location", v)} placeholder="City, Country" />
          <Input label="Website" value={personal.website} onChange={v => updatePersonal("website", v)} placeholder="yoursite.com" />
          <Input label="LinkedIn" value={personal.linkedin} onChange={v => updatePersonal("linkedin", v)} placeholder="linkedin.com/in/you" />
        </div>
      </Card>

      <Card className="p-4">
        <Textarea
          label="Professional Summary"
          value={personal.summary}
          onChange={v => updatePersonal("summary", v)}
          placeholder="Brief professional summary highlighting your experience, skills, and goals..."
          rows={5}
        />
      </Card>
    </div>
  );
}
