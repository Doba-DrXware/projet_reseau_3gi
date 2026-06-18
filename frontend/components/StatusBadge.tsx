type BadgeVariant = "success" | "danger" | "warning" | "neutral";

const styles: Record<BadgeVariant, string> = {
  success: "bg-green-50 text-[var(--success)] border-green-200",
  danger: "bg-red-50 text-[var(--danger)] border-red-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  neutral: "bg-gray-50 text-[var(--muted)] border-gray-200",
};

export default function StatusBadge({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]}`}>
      {children}
    </span>
  );
}
