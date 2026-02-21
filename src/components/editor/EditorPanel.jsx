import { useResume } from "../../context/ResumeContext";
import PersonalEditor from "./PersonalEditor";
import ExperienceEditor from "./ExperienceEditor";
import EducationEditor from "./EducationEditor";
import SkillsEditor from "./SkillsEditor";
import ProjectsEditor from "./ProjectsEditor";
import { LanguagesEditor, CertificationsEditor } from "./MiscEditors";
import SectionsEditor from "./SectionsEditor";

const PANELS = {
  personal: PersonalEditor,
  experience: ExperienceEditor,
  education: EducationEditor,
  skills: SkillsEditor,
  projects: ProjectsEditor,
  languages: LanguagesEditor,
  certifications: CertificationsEditor,
  sections: SectionsEditor,
};

export default function EditorPanel() {
  const { activeSection } = useResume();
  const Panel = PANELS[activeSection] || PersonalEditor;

  return (
    <div className="flex-1 overflow-y-auto pr-1">
      <div className="max-w-lg mx-auto py-4 px-1">
        <Panel />
      </div>
    </div>
  );
}
