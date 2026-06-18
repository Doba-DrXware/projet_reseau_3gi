import StatusBadge from "@/components/StatusBadge";
import { MOCK_STOCK_ALERTS } from "@/lib/mock-data";

export default function PharmacienNotificationsPage() {
  return (
    <main>
      <div className="bg-[var(--primary)] px-6 pt-10 pb-8 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white">Alertes stock</h1>
        <p className="text-white/80 text-sm mt-1">Notifications temps réel</p>
      </div>

      <div className="px-6 py-6 flex flex-col gap-3">
        {MOCK_STOCK_ALERTS.map((alert) => (
          <div key={alert.id} className="bg-white border border-[var(--border)] rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-[var(--secondary)]">{alert.name}</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Stock critique — {alert.remaining} unité(s) restante(s)
                </p>
              </div>
              <StatusBadge variant={alert.level === "Faible" ? "warning" : "danger"}>
                {alert.level}
              </StatusBadge>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
