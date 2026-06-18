export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { wrapper: "w-14 h-14", icon: "w-8 h-8", title: "text-lg" },
    md: { wrapper: "w-20 h-20", icon: "w-12 h-12", title: "text-2xl" },
    lg: { wrapper: "w-24 h-24", icon: "w-14 h-14", title: "text-3xl" },
  };
  const s = sizes[size];

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${s.wrapper} rounded-full bg-white border-2 border-[var(--primary)] flex items-center justify-center shadow-md mb-3`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          className={s.icon}
        >
          <ellipse cx="32" cy="32" rx="14" ry="24" stroke="var(--primary)" strokeWidth="3" fill="none" />
          <line x1="18" y1="32" x2="46" y2="32" stroke="var(--primary)" strokeWidth="3" />
          <ellipse cx="32" cy="20" rx="14" ry="12" fill="var(--primary-light)" opacity="0.3" />
          <path d="M44 20 Q52 14 60 20" stroke="var(--primary-light)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M46 23 Q52 18 58 23" stroke="var(--primary-light)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="52" cy="26" r="1.5" fill="var(--primary-light)" />
        </svg>
      </div>
      <h1 className={`${s.title} font-bold text-[var(--secondary)] tracking-wide`}>PROXYMÉDOC</h1>
      <p className="text-[var(--muted)] text-sm mt-0.5">Pharmacie de Proximité</p>
    </div>
  );
}
