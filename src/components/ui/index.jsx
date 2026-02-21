// Shared small UI primitives

export function Input({ label, value, onChange, placeholder, type = "text", className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{label}</label>}
      <input
        type={type}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition"
      />
    </div>
  );
}

export function Textarea({ label, value, onChange, placeholder, rows = 3, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{label}</label>}
      <textarea
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition resize-none"
      />
    </div>
  );
}

export function Select({ label, value, onChange, options, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{label}</label>}
      <select
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition"
      >
        {options.map(o => (
          <option key={o.value || o} value={o.value || o}>{o.label || o}</option>
        ))}
      </select>
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${checked ? "bg-sky-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
      >
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-4" : ""}`} />
      </div>
      {label && <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>}
    </label>
  );
}

export function Btn({ children, onClick, variant = "primary", size = "md", className = "", disabled = false, title }) {
  const base = "inline-flex items-center gap-1.5 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-2.5 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-base" };
  const variants = {
    primary: "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500",
    secondary: "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 focus:ring-zinc-400",
    danger: "bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 focus:ring-red-400",
    ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 focus:ring-zinc-400",
  };
  return (
    <button title={title} disabled={disabled} onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({ title, icon, count, onAdd, addLabel = "Add" }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">{title}</h3>
        {count !== undefined && (
          <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full">{count}</span>
        )}
      </div>
      {onAdd && (
        <Btn size="sm" onClick={onAdd} variant="secondary">
          <span>+</span> {addLabel}
        </Btn>
      )}
    </div>
  );
}

export function ItemCard({ children, onDelete, className = "" }) {
  return (
    <div className={`relative group bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-4 ${className}`}>
      <button
        onClick={onDelete}
        title="Remove"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all text-lg leading-none"
      >
        ×
      </button>
      {children}
    </div>
  );
}

export function StarRating({ value, onChange, max = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className={`w-5 h-5 rounded-sm transition-colors ${i < value ? "bg-amber-400" : "bg-zinc-200 dark:bg-zinc-700"}`}
          title={`Level ${i + 1}`}
        />
      ))}
    </div>
  );
}
