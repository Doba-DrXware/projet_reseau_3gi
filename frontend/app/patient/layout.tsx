import RoleGuard from "@/components/RoleGuard";
import BottomNav from "@/components/BottomNav";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRole="PATIENT">
      <div className="min-h-screen bg-white pb-20">
        {children}
        <BottomNav role="patient" />
      </div>
    </RoleGuard>
  );
}
