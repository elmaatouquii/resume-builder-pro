export function formatDate(dateStr, showPresent = false) {
  if (!dateStr) return showPresent ? "Present" : "";
  const [year, month] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export const ACCENT_COLORS = [
  { label: "Sky", value: "#0ea5e9" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Emerald", value: "#10b981" },
  { label: "Rose", value: "#f43f5e" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Slate", value: "#475569" },
  { label: "Indigo", value: "#6366f1" },
  { label: "Teal", value: "#14b8a6" },
];

export const SKILL_LEVELS = ["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];
export const LANGUAGE_LEVELS = ["Basic", "Conversational", "Fluent", "Native"];
