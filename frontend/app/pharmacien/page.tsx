import Link from "next/link";
import { MOCK_STOCK_ALERTS, MOCK_RESERVATIONS } from "@/lib/mock-data";

/* Inspiré maquette "Accueil Pharmacie" Figma */

export default function PharmacienDashboardPage() {
  const critiques = MOCK_STOCK_ALERTS.filter((a) => a.level === "Critique").length;
  const enAttente = MOCK_RESERVATIONS.filter((r) => r.status === "En attente").length;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header bleu-vert (style maquette pharmacien) */}
      <div className="bg-gradient-to-br from-[#0284C7] via-[#0EA5E9] to-[#22C55E] px-6 pt-14 pb-24 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-60 h-60 rounded-full bg-white/10" />
        <div className="absolute bottom-[0px] left-[-20px] w-36 h-36 rounded-full bg-[#0284C7]/30" />

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-sky-100 text-xs font-semibold uppercase tracking-wider">Gestionnaire</p>
            <h1 className="text-white text-2xl font-black mt-0.5">Pharmacie Centrale</h1>
            <span className="inline-flex items-center gap-1 mt-2 bg-[#DCFCE7]/30 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              Active
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-xl">🏥</div>
        </div>
      </div>

      <div className="px-5 -mt-10 pb-6 flex flex-col gap-6 relative z-10">

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Médicaments", value: "124", icon: "💊", bg: "bg-[#E0F2FE]", text: "text-[#0284C7]" },
            { label: "Ruptures", value: String(critiques), icon: "⚠️", bg: "bg-[#FEE2E2]", text: "text-[#DC2626]" },
            { label: "Réservations", value: String(enAttente), icon: "🕐", bg: "bg-[#FEF3C7]", text: "text-[#B45309]" },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-3xl p-4 shadow-md border border-[#F1F5F9] text-center">
              <div className={`w-10 h-10 rounded-2xl ${k.bg} flex items-center justify-center mx-auto mb-2 text-lg`}>{k.icon}</div>
              <p className={`text-2xl font-black ${k.text}`}>{k.value}</p>
              <p className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Accès gestionnaire */}
        <Link href="/pharmacien/stock"
          className="bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] rounded-3xl p-5 shadow-lg flex items-center gap-4 active:scale-98 transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl flex-shrink-0">📦</div>
          <div className="flex-1">
            <p className="text-white font-black text-base">Accéder au gestionnaire</p>
            <p className="text-sky-100 text-xs mt-0.5">Gérer médicaments, stocks et alertes</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </Link>

        {/* Alertes de stock */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-black text-[#0F172A] text-base">Alertes stock</h2>
            <Link href="/pharmacien/notifications" className="text-[#0EA5E9] text-xs font-semibold">Voir tout →</Link>
          </div>
          <div className="flex flex-col gap-3">
            {MOCK_STOCK_ALERTS.map((alert) => {
              const styles = {
                Critique: { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", badge: "bg-[#FEE2E2] text-[#DC2626]" },
                Rupture:  { bg: "bg-[#FEF3C7]", text: "text-[#B45309]", badge: "bg-[#FEF3C7] text-[#B45309]" },
                Faible:   { bg: "bg-[#E0F2FE]", text: "text-[#0284C7]", badge: "bg-[#E0F2FE] text-[#0284C7]" },
              }[alert.level] || { bg: "bg-[#F1F5F9]", text: "text-[#64748B]", badge: "bg-[#F1F5F9] text-[#64748B]" };
              return (
                <div key={alert.id} className="bg-white rounded-3xl p-4 shadow-md flex items-center gap-4 border border-[#F1F5F9]">
                  <div className={`w-12 h-12 rounded-2xl ${styles.bg} flex items-center justify-center flex-shrink-0 text-xl`}>
                    {alert.level === "Critique" ? "🔴" : alert.level === "Rupture" ? "🟡" : "🔵"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0F172A] text-sm truncate">{alert.name}</p>
                    <p className="text-[#94A3B8] text-xs mt-0.5">{alert.remaining} boîte{alert.remaining !== 1 ? "s" : ""} restante{alert.remaining !== 1 ? "s" : ""}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${styles.badge}`}>{alert.level}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Réservations en attente */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-black text-[#0F172A] text-base">Réservations</h2>
          </div>
          <div className="flex flex-col gap-3">
            {MOCK_RESERVATIONS.map((r) => (
              <div key={r.id} className="bg-white rounded-3xl p-4 shadow-md flex items-center gap-4 border border-[#F1F5F9]">
                <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 text-xl">🛍️</div>
                <div className="flex-1">
                  <p className="font-bold text-[#0F172A] text-sm">{r.client}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{r.items} article{r.items !== 1 ? "s" : ""} • {r.total.toLocaleString()} FCFA</p>
                </div>
                <span className="bg-[#FEF3C7] text-[#B45309] text-[10px] font-bold px-2.5 py-1 rounded-full">{r.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
