export function CircleIcon({ active = false, size = 44, children, title }) {
  // UI
  return (
    <span
      title={title}
      className={[
        "inline-flex items-center justify-center select-none rounded-full",
        "transition-colors",
        active
          ? "bg-white text-[#5B235B] border-[#5B235B]"
          : "bg-white/80 text-black/80 border-black/70",
        "border-[1.5px]",
      ].join(" ")}
      style={{ width: size, height: size }}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </span>
  );
}

export function HomeIcon({ active = false, size = 44 }) {
  return (
    <CircleIcon active={active} size={size} title="Aktiviteter">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </svg>
    </CircleIcon>
  );
}

export function SearchIcon({ active = false, size = 44 }) {
  return (
    <CircleIcon active={active} size={size} title="Søg">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.2-3.2" />
      </svg>
    </CircleIcon>
  );
}

export function CalendarIcon({ active = false, size = 44 }) {
  return (
    <CircleIcon active={active} size={size} title="Kalender">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    </CircleIcon>
  );
}
