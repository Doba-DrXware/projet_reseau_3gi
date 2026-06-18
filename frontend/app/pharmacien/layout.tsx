import BottomNav from "@/components/BottomNav";

export default function PharmacienLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white pb-20">
      {children}
      <BottomNav role="pharmacien" />
    </div>
  );
}
