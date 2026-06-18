import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  onBack?: () => void;
}

export default function PageHeader({ title, subtitle, backHref, onBack }: PageHeaderProps) {
  return (
    <div className="bg-[var(--primary)] px-6 pt-10 pb-8 rounded-b-3xl">
      {(backHref || onBack) && (
        backHref ? (
          <Link href={backHref} className="text-white/80 text-sm flex items-center gap-1 mb-4 hover:text-white">
            <span>←</span> Retour
          </Link>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="text-white/80 text-sm flex items-center gap-1 mb-4 hover:text-white"
          >
            <span>←</span> Retour
          </button>
        )
      )}
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {subtitle && <p className="text-white/80 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}
