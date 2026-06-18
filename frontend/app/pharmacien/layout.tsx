import RoleGuard from "@/components/RoleGuard";
import BottomNav from "@/components/BottomNav";

export default function PharmacienLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRole="PHARMACIEN">
      <div className="min-h-screen bg-white pb-20">
        {children}
        <BottomNav role="pharmacien" />
      </div>
    </RoleGuard>
  );
}
