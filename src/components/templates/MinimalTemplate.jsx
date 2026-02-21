import { formatDate } from "../../utils/helpers";

export default function MinimalTemplate({ data, settings }) {
  const { personal, experience, education, skills, projects, languages, certifications } = data;
  const { accentColor, sectionOrder = [], hiddenSections = [] } = settings;
  const accent = accentColor || "#0ea5e9";
  const isVisible = s => !hiddenSections.includes(s);

  const SectionTitle = ({ children }) => (
    <h2 style={{
      fontSize: "7.5px", fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.16em", color: "#cbd5e1", marginBottom: "10px",
    }}>
      {children}
    </h2>
  );

  return (
    <div style={{
      fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
      backgroundColor: "#ffffff",
      color: "#1e293b",
      lineHeight: 1.5,
    }}>
      {/* Header */}
      <div style={{ padding: "36px 40px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
          {personal.photo && (
            <img
              src={personal.photo} alt=""
              style={{
                width: "64px", height: "64px", borderRadius: "50%",
                objectFit: "cover", flexShrink: 0, filter: "grayscale(100%)",
                border: "1.5px solid #e2e8f0",
              }}
              onError={e => { e.target.style.display = "none"; }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em",
              color: "#0f172a", margin: 0, lineHeight: 1.1,
            }}>
              {personal.name || "Your Name"}
            </h1>
            <p style={{
              fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
              fontWeight: 600, color: accent, margin: "5px 0 0",
            }}>
              {personal.title}
            </p>
          </div>
        </div>

        {/* Contact bar */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "6px 24px",
          marginTop: "14px", paddingTop: "12px",
          borderTop: "1px solid #f1f5f9",
          fontSize: "8.5px", color: "#94a3b8",
        }}>
          {personal.email    && <span>{personal.email}</span>}
          {personal.phone    && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website  && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div style={{ padding: "0 40px 16px" }}>
          <p style={{
            fontSize: "9.5px", color: "#64748b", lineHeight: 1.7,
            borderLeft: `2.5px solid ${accent}`, paddingLeft: "12px",
            margin: 0,
          }}>
            {personal.summary}
          </p>
        </div>
      )}

      <div style={{ padding: "0 40px 36px" }}>
        {sectionOrder.map(section => {
          if (!isVisible(section)) return null;

          if (section === "experience" && experience?.length > 0) return (
            <div key={section} style={{ marginBottom: "18px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map((exp, i) => (
                <div key={exp.id} style={{
                  display: "flex", gap: "20px",
                  marginBottom: i < experience.length - 1 ? "12px" : 0,
                  paddingBottom: i < experience.length - 1 ? "12px" : 0,
                  borderBottom: i < experience.length - 1 ? "1px solid #f8fafc" : "none",
                }}>
                  <div style={{ width: "88px", flexShrink: 0, textAlign: "right" }}>
                    <p style={{ fontSize: "8px", color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
                      {formatDate(exp.startDate)}<br />–<br />{exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{exp.role}</p>
                    <p style={{ fontSize: "9px", fontWeight: 500, color: accent, margin: "2px 0 0" }}>{exp.company}</p>
                    {exp.description && (
                      <p style={{ fontSize: "8.5px", color: "#64748b", marginTop: "5px", lineHeight: 1.65 }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );

          if (section === "education" && education?.length > 0) return (
            <div key={section} style={{ marginBottom: "18px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map((edu, i) => (
                <div key={edu.id} style={{
                  display: "flex", gap: "20px",
                  marginBottom: i < education.length - 1 ? "10px" : 0,
                }}>
                  <div style={{ width: "88px", flexShrink: 0, textAlign: "right" }}>
                    <p style={{ fontSize: "8px", color: "#94a3b8", margin: 0 }}>
                      {formatDate(edu.endDate) || formatDate(edu.startDate)}
                    </p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                      {edu.degree}{edu.field ? ` · ${edu.field}` : ""}
                    </p>
                    <p style={{ fontSize: "9px", color: accent, margin: "2px 0 0" }}>{edu.institution}</p>
                    {edu.description && (
                      <p style={{ fontSize: "8.5px", color: "#94a3b8", marginTop: "3px" }}>{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );

          if (section === "skills" && skills?.length > 0) return (
            <div key={section} style={{ marginBottom: "18px" }}>
              <SectionTitle>Skills</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {skills.map(s => (
                  <span key={s.id} style={{
                    fontSize: "8.5px", padding: "3px 10px", borderRadius: "4px",
                    border: "1px solid #e2e8f0", color: "#475569", fontWeight: 500,
                  }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          );

          if (section === "projects" && projects?.length > 0) return (
            <div key={section} style={{ marginBottom: "18px" }}>
              <SectionTitle>Projects</SectionTitle>
              {projects.map((proj, i) => (
                <div key={proj.id} style={{
                  marginBottom: i < projects.length - 1 ? "10px" : 0,
                  paddingBottom: i < projects.length - 1 ? "10px" : 0,
                  borderBottom: i < projects.length - 1 ? "1px solid #f8fafc" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{proj.name}</p>
                    {proj.url && <span style={{ fontSize: "8px", color: "#94a3b8" }}>{proj.url}</span>}
                  </div>
                  {proj.description && (
                    <p style={{ fontSize: "8.5px", color: "#64748b", marginTop: "3px", lineHeight: 1.65 }}>
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          );

          if (section === "languages" && languages?.length > 0) return (
            <div key={section} style={{ marginBottom: "18px" }}>
              <SectionTitle>Languages</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {languages.map(l => (
                  <span key={l.id} style={{ fontSize: "9px", color: "#475569" }}>
                    <span style={{ fontWeight: 600 }}>{l.name}</span>
                    <span style={{ color: "#94a3b8" }}> · {l.level}</span>
                  </span>
                ))}
              </div>
            </div>
          );

          if (section === "certifications" && certifications?.length > 0) return (
            <div key={section} style={{ marginBottom: "18px" }}>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map((c, i) => (
                <div key={c.id} style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: i < certifications.length - 1 ? "6px" : 0,
                }}>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, color: "#334155" }}>
                    {c.name}
                    {c.issuer && <span style={{ fontWeight: 400, color: "#94a3b8" }}> · {c.issuer}</span>}
                  </span>
                  {c.date && <span style={{ fontSize: "8.5px", color: "#94a3b8" }}>{formatDate(c.date)}</span>}
                </div>
              ))}
            </div>
          );

          return null;
        })}
      </div>
    </div>
  );
}
