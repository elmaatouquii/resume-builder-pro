import { formatDate } from "../../utils/helpers";

/* ─── Tiny SVG icons (no emoji — emoji breaks html2canvas) ─────────────── */
const Icons = {
  email: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{flexShrink:0}}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  phone: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{flexShrink:0}}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.55 5.55l1.06-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  location: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{flexShrink:0}}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  link: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{flexShrink:0}}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  linkedin: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#64748b" style={{flexShrink:0}}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
};

/* ─── Section wrapper ──────────────────────────────────────────────────── */
function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom: "13px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <span style={{
          fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: accent, whiteSpace: "nowrap",
        }}>
          {title}
        </span>
        <div style={{ flex: 1, height: "1px", backgroundColor: accent + "30" }} />
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", backgroundColor: "#f1f5f9", margin: "8px 0" }} />;
}

function ContactRow({ icon, text }) {
  if (!text) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#475569", fontSize: "9px" }}>
      {icon}
      {text}
    </span>
  );
}

function SkillPill({ name, level, accent }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "3px 10px", borderRadius: "999px", fontSize: "8.5px",
      fontWeight: 500, backgroundColor: accent + "12",
      color: accent, border: `1px solid ${accent}28`,
    }}>
      {name}
      <span style={{ display: "inline-flex", gap: "2px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{
            width: "5px", height: "5px", borderRadius: "50%",
            backgroundColor: i < level ? accent : "#e2e8f0",
            display: "inline-block",
          }} />
        ))}
      </span>
    </span>
  );
}

/* ─── Main ─────────────────────────────────────────────────────────────── */
export default function ModernTemplate({ data, settings }) {
  const { personal, experience, education, skills, projects, languages, certifications } = data;
  const { accentColor, sectionOrder = [], hiddenSections = [] } = settings;
  const accent = accentColor || "#0ea5e9";
  const isVisible = (s) => !hiddenSections.includes(s);

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: "#ffffff",
      color: "#1e293b",
      lineHeight: 1.45,
      WebkitFontSmoothing: "antialiased",
    }}>
      {/* ── HEADER ── */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: "18px",
        padding: "30px 34px 20px",
        borderBottom: `2.5px solid ${accent}`,
      }}>
        {personal.photo && (
          <img
            src={personal.photo}
            alt=""
            style={{
              width: "72px", height: "72px", borderRadius: "10px",
              objectFit: "cover", flexShrink: 0,
              border: `2.5px solid ${accent}35`,
            }}
            onError={e => { e.target.style.display = "none"; }}
          />
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{
            fontSize: "24px", fontWeight: 700, color: "#0f172a",
            margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em",
          }}>
            {personal.name || "Your Name"}
          </h1>
          <p style={{
            fontSize: "10px", fontWeight: 600, color: accent,
            margin: "4px 0 12px", letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            {personal.title}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px" }}>
            <ContactRow icon={Icons.email}    text={personal.email} />
            <ContactRow icon={Icons.phone}    text={personal.phone} />
            <ContactRow icon={Icons.location} text={personal.location} />
            <ContactRow icon={Icons.link}     text={personal.website} />
            <ContactRow icon={Icons.linkedin} text={personal.linkedin} />
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "20px 34px 28px" }}>

        {/* Summary */}
        {personal.summary && (
          <div style={{
            marginBottom: "16px", padding: "10px 14px",
            borderLeft: `3px solid ${accent}`,
            backgroundColor: accent + "09",
            borderRadius: "0 6px 6px 0",
          }}>
            <p style={{ fontSize: "9.5px", color: "#475569", lineHeight: 1.7, margin: 0 }}>
              {personal.summary}
            </p>
          </div>
        )}

        {sectionOrder.map(section => {
          if (!isVisible(section)) return null;

          /* Experience */
          if (section === "experience" && experience?.length > 0) return (
            <Section key={section} title="Experience" accent={accent}>
              {experience.map((exp, i) => (
                <div key={exp.id}>
                  {i > 0 && <Divider />}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "10.5px", fontWeight: 600, color: "#0f172a", margin: 0 }}>
                        {exp.role}
                      </p>
                      <p style={{ fontSize: "9.5px", fontWeight: 500, color: accent, margin: "2px 0 0" }}>
                        {exp.company}
                        {exp.location && <span style={{ color: "#94a3b8", fontWeight: 400 }}> · {exp.location}</span>}
                      </p>
                    </div>
                    <p style={{ fontSize: "8.5px", color: "#94a3b8", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: "9px", color: "#64748b", marginTop: "5px", lineHeight: 1.65 }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          );

          /* Education */
          if (section === "education" && education?.length > 0) return (
            <Section key={section} title="Education" accent={accent}>
              {education.map((edu, i) => (
                <div key={edu.id}>
                  {i > 0 && <Divider />}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "10.5px", fontWeight: 600, color: "#0f172a", margin: 0 }}>
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                      </p>
                      <p style={{ fontSize: "9.5px", color: accent, margin: "2px 0 0" }}>{edu.institution}</p>
                      {edu.gpa && <p style={{ fontSize: "8.5px", color: "#94a3b8", margin: "2px 0 0" }}>GPA {edu.gpa}</p>}
                    </div>
                    <p style={{ fontSize: "8.5px", color: "#94a3b8", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
                      {formatDate(edu.startDate)}{edu.endDate ? ` – ${formatDate(edu.endDate)}` : ""}
                    </p>
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: "9px", color: "#64748b", marginTop: "4px", lineHeight: 1.6 }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          );

          /* Skills */
          if (section === "skills" && skills?.length > 0) return (
            <Section key={section} title="Skills" accent={accent}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {skills.map(s => <SkillPill key={s.id} name={s.name} level={s.level} accent={accent} />)}
              </div>
            </Section>
          );

          /* Projects */
          if (section === "projects" && projects?.length > 0) return (
            <Section key={section} title="Projects" accent={accent}>
              {projects.map((proj, i) => (
                <div key={proj.id}>
                  {i > 0 && <Divider />}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <p style={{ fontSize: "10.5px", fontWeight: 600, color: "#0f172a", margin: 0 }}>{proj.name}</p>
                    {proj.url && <p style={{ fontSize: "8.5px", color: "#94a3b8", margin: 0 }}>{proj.url}</p>}
                  </div>
                  {proj.role && <p style={{ fontSize: "9px", fontWeight: 500, color: accent, margin: "2px 0" }}>{proj.role}</p>}
                  {proj.description && (
                    <p style={{ fontSize: "9px", color: "#64748b", lineHeight: 1.65, margin: "3px 0" }}>
                      {proj.description}
                    </p>
                  )}
                  {proj.technologies?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "5px" }}>
                      {proj.technologies.map(t => (
                        <span key={t} style={{
                          fontSize: "8px", padding: "2px 7px", borderRadius: "4px",
                          backgroundColor: "#f1f5f9", color: "#475569",
                        }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Section>
          );

          /* Languages */
          if (section === "languages" && languages?.length > 0) return (
            <Section key={section} title="Languages" accent={accent}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {languages.map(l => (
                  <div key={l.id} style={{ fontSize: "9.5px" }}>
                    <span style={{ fontWeight: 600, color: "#334155" }}>{l.name}</span>
                    <span style={{ color: "#94a3b8", marginLeft: "4px" }}>({l.level})</span>
                  </div>
                ))}
              </div>
            </Section>
          );

          /* Certifications */
          if (section === "certifications" && certifications?.length > 0) return (
            <Section key={section} title="Certifications" accent={accent}>
              {certifications.map((c, i) => (
                <div key={c.id}>
                  {i > 0 && <Divider />}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#0f172a" }}>{c.name}</span>
                      {c.issuer && <span style={{ fontSize: "9px", color: "#64748b", marginLeft: "6px" }}>· {c.issuer}</span>}
                    </div>
                    {c.date && <span style={{ fontSize: "8.5px", color: "#94a3b8" }}>{formatDate(c.date)}</span>}
                  </div>
                </div>
              ))}
            </Section>
          );

          return null;
        })}
      </div>
    </div>
  );
}
