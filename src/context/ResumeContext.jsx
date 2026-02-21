import { createContext, useContext, useState, useEffect, useCallback } from "react";

const DEFAULT_DATA = {
  personal: {
    name: "Alexandra Chen",
    title: "Senior Product Designer",
    email: "alexandra@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "alexandra.design",
    linkedin: "linkedin.com/in/alexchen",
    summary: "Passionate product designer with 8+ years crafting intuitive digital experiences for Fortune 500 companies and fast-growing startups. Specializing in user-centered design systems and cross-functional team leadership.",
    photo: "",
  },
  experience: [
    {
      id: "exp1",
      company: "Stripe",
      role: "Lead Product Designer",
      startDate: "2021-03",
      endDate: "",
      current: true,
      location: "San Francisco, CA",
      description: "Led design for Stripe's merchant dashboard, improving conversion by 34%. Managed a team of 5 designers and established design system used by 200+ engineers.",
    },
    {
      id: "exp2",
      company: "Airbnb",
      role: "Senior UX Designer",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      location: "San Francisco, CA",
      description: "Redesigned the host onboarding flow, increasing host activation by 28%. Collaborated with PM and engineering to ship 12 major product features.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Carnegie Mellon University",
      degree: "Master of Human-Computer Interaction",
      field: "HCI",
      startDate: "2014-09",
      endDate: "2016-05",
      gpa: "3.9",
      description: "Thesis on adaptive interfaces and personalization algorithms.",
    },
  ],
  skills: [
    { id: "sk1", name: "Figma", level: 5, category: "Design" },
    { id: "sk2", name: "User Research", level: 5, category: "Research" },
    { id: "sk3", name: "Prototyping", level: 4, category: "Design" },
    { id: "sk4", name: "React", level: 3, category: "Development" },
    { id: "sk5", name: "Design Systems", level: 5, category: "Design" },
    { id: "sk6", name: "SQL", level: 3, category: "Development" },
  ],
  projects: [
    {
      id: "proj1",
      name: "DesignOps Toolkit",
      role: "Creator & Maintainer",
      url: "github.com/alexchen/designops",
      description: "Open-source toolkit for design operations teams. 2,400+ GitHub stars.",
      technologies: ["React", "Figma API", "Node.js"],
    },
  ],
  languages: [
    { id: "lang1", name: "English", level: "Native" },
    { id: "lang2", name: "Mandarin", level: "Fluent" },
    { id: "lang3", name: "French", level: "Intermediate" },
  ],
  certifications: [
    { id: "cert1", name: "Google UX Design Certificate", issuer: "Google", date: "2022-05" },
  ],
};

const DEFAULT_SETTINGS = {
  template: "modern",
  accentColor: "#0ea5e9",
  darkMode: false,
  sectionOrder: ["experience", "education", "skills", "projects", "languages", "certifications"],
  hiddenSections: [],
  fontSize: "medium",
};

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("resumeData");
      return saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : DEFAULT_DATA;
    } catch { return DEFAULT_DATA; }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("resumeSettings");
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch { return DEFAULT_SETTINGS; }
  });

  const [activeSection, setActiveSection] = useState("personal");

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("resumeSettings", JSON.stringify(settings));
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings]);

  const updatePersonal = useCallback((field, value) => {
    setData(d => ({ ...d, personal: { ...d.personal, [field]: value } }));
  }, []);

  const addItem = useCallback((section) => {
    const id = `${section}_${Date.now()}`;
    const templates = {
      experience: { id, company: "", role: "", startDate: "", endDate: "", current: false, location: "", description: "" },
      education: { id, institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", description: "" },
      skills: { id, name: "", level: 3, category: "General" },
      projects: { id, name: "", role: "", url: "", description: "", technologies: [] },
      languages: { id, name: "", level: "Conversational" },
      certifications: { id, name: "", issuer: "", date: "" },
    };
    setData(d => ({ ...d, [section]: [...d[section], templates[section]] }));
  }, []);

  const updateItem = useCallback((section, id, field, value) => {
    setData(d => ({
      ...d,
      [section]: d[section].map(item => item.id === id ? { ...item, [field]: value } : item),
    }));
  }, []);

  const removeItem = useCallback((section, id) => {
    setData(d => ({ ...d, [section]: d[section].filter(item => item.id !== id) }));
  }, []);

  const reorderItems = useCallback((section, fromIndex, toIndex) => {
    setData(d => {
      const arr = [...d[section]];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return { ...d, [section]: arr };
    });
  }, []);

  const updateSettings = useCallback((key, value) => {
    setSettings(s => ({ ...s, [key]: value }));
  }, []);

  const clearAll = useCallback(() => {
    if (window.confirm("Clear all resume data? This cannot be undone.")) {
      setData(DEFAULT_DATA);
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  const toggleSection = useCallback((section) => {
    setSettings(s => ({
      ...s,
      hiddenSections: s.hiddenSections.includes(section)
        ? s.hiddenSections.filter(x => x !== section)
        : [...s.hiddenSections, section],
    }));
  }, []);

  const reorderSections = useCallback((newOrder) => {
    setSettings(s => ({ ...s, sectionOrder: newOrder }));
  }, []);

  return (
    <ResumeContext.Provider value={{
      data, settings, activeSection, setActiveSection,
      updatePersonal, addItem, updateItem, removeItem,
      reorderItems, updateSettings, clearAll, toggleSection, reorderSections,
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
