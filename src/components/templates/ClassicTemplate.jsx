import { formatDate } from "../../utils/helpers";

export default function ClassicTemplate({ data, settings }) {
  const { personal, experience, education, skills, projects, languages, certifications } = data;
  const { accentColor, sectionOrder = [], hiddenSections = [] } = settings;
  const accent = accentColor || "#0ea5e9";
  const isVisible = s => !hiddenSections.includes(s);

  const SideSection = ({ title, children }) => (
    <div style={{ marginBottom: "16px" }}>
      <h3 style={{
        fontSize: "8px", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)",
        marginBottom: "8px", paddingBottom: "4px",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const MainSection = ({ title, children }) => (
    <div style={{ marginBottom: "16px" }}>
      <h3 style={{
        fontSize: "8.5px", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.12em", color: accent,
        marginBottom: "8px", paddingBottom: "4px",
        borderBottom: `1.5px solid ${accent}`,
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div style={{
      fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
      backgroundColor: "#ffffff",
      color: "#1e293b",
      display: "flex",
      lineHeight: 1.45,
    }}>
      {/* Sidebar */}
      <div style={{
        width: "175px", flexShrink: 0, color: "#ffffff",
        padding: "24px 18px", display: "flex", flexDirection: "column",
        backgroundColor: accent,
      }}>
        {personal.photo && (
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
            <img
              src={personal.photo} alt=""
              style={{
                width: "80px", height: "80px", borderRadius: "50%",
                objectFit: "cover", border: "2.5px solid rgba(255,255,255,0.4)",
              }}
              onError={e => { e.target.style.display = "none"; }}
            />
          </div>
        )}

        <SideSection title="Contact">
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { label: personal.email },
              { label: personal.phone },
              { label: personal.location },
              { label: personal.website },
              { label: personal.linkedin },
            ].filter(x => x.label).map((item, i) => (
              <span key={i} style={{ fontSize: "8.5px", color: "rgba(255,255,255,0.85)", wordBreak: "break-all" }}>
                {item.label}
              </span>
            ))}
          </div>
        </SideSection>

        {isVisible("skills") && skills?.length > 0 && (
          <SideSection title="Skills">
            {skills.map(s => (
              <div key={s.id} style={{ marginBottom: "7px" }}>
                <p style={{ fontSize: "8.5px", color: "rgba(255,255,255,0.9)", margin: "0 0 3px" }}>{s.name}</p>
                <div style={{ display: "flex", gap: "2px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} style={{
                      height: "3px", flex: 1, borderRadius: "2px",
                      backgroundColor: i < s.level ? "#ffffff" : "rgba(255,255,255,0.25)",
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </SideSection>
        )}

        {isVisible("languages") && languages?.length > 0 && (
          <SideSection title="Languages">
            {languages.map(l => (
              <div key={l.id} style={{ marginBottom: "5px" }}>
                <p style={{ fontSize: "8.5px", fontWeight: 600, color: "rgba(255,255,255,0.95)", margin: 0 }}>{l.name}</p>
                <p style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.6)", margin: "1px 0 0" }}>{l.level}</p>
              </div>
            ))}
          </SideSection>
        )}

        {isVisible("certifications") && certifications?.length > 0 && (
          <SideSection title="Certifications">
            {certifications.map(c => (
              <div key={c.id} style={{ marginBottom: "6px" }}>
                <p style={{ fontSize: "8.5px", fontWeight: 600, color: "rgba(255,255,255,0.95)", margin: 0, lineHeight: 1.3 }}>{c.name}</p>
                {c.issuer && <p style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.6)", margin: "1px 0 0" }}>{c.issuer}</p>}
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "24px 24px 28px" }}>
        {/* Name / title */}
        <div style={{ marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {personal.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "10px", fontWeight: 600, color: accent, margin: "4px 0 0", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {personal.title}
          </p>
          {personal.summary && (
            <p style={{ fontSize: "9px", color: "#64748b", marginTop: "10px", lineHeight: 1.65 }}>
              {personal.summary}
            </p>
          )}
        </div>

        {sectionOrder.map(section => {
          if (!isVisible(section)) return null;
          if (["skills", "languages", "certifications"].includes(section)) return null;

          if (section === "experience" && experience?.length > 0) return (
            <MainSection key={section} title="Work Experience">
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? "10px" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    <div>
                      <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{exp.role}</p>
                      <p style={{ fontSize: "9.5px", fontWeight: 500, color: accent, margin: "2px 0 0" }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                      </p>
                    </div>
                    <p style={{ fontSize: "8.5px", color: "#94a3b8", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: "9px", color: "#64748b", marginTop: "4px", lineHeight: 1.6 }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </MainSection>
          );

          if (section === "education" && education?.length > 0) return (
            <MainSection key={section} title="Education">
              {education.map((edu, i) => (
                <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? "10px" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    <div>
                      <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                      </p>
                      <p style={{ fontSize: "9.5px", color: accent, margin: "2px 0 0" }}>{edu.institution}</p>
                    </div>
                    <p style={{ fontSize: "8.5px", color: "#94a3b8", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </p>
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: "9px", color: "#64748b", marginTop: "4px", lineHeight: 1.6 }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </MainSection>
          );

          if (section === "projects" && projects?.length > 0) return (
            <MainSection key={section} title="Projects">
              {projects.map((proj, i) => (
                <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? "10px" : 0 }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{proj.name}</p>
                    {proj.url && <p style={{ fontSize: "8px", color: "#94a3b8", margin: 0 }}>{proj.url}</p>}
                  </div>
                  {proj.description && (
                    <p style={{ fontSize: "9px", color: "#64748b", marginTop: "3px", lineHeight: 1.6 }}>{proj.description}</p>
                  )}
                  {proj.technologies?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "4px" }}>
                      {proj.technologies.map(t => (
                        <span key={t} style={{
                          fontSize: "7.5px", padding: "2px 6px", borderRadius: "3px",
                          backgroundColor: accent + "15", color: accent,
                        }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </MainSection>
          );

          return null;
        })}
      </div>
    </div>
  );
}
