"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MOCK_ADMIN_PHARMACIES } from "@/lib/mock-data";

/* Inspiré maquettes "Espace administrateur", "Ajouter pharmacie", "Modifier pharmacie", "Confirmer suppression" Figma */

type Pharmacy = { id: string; name: string; city: string; active: boolean; phone: string; };

export default function AdminPage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(MOCK_ADMIN_PHARMACIES);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all"|"active"|"inactive">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState<Pharmacy | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", city: "", phone: "" });
  const router = useRouter();

  const handleLogout = () => {
    try {
      ["token", "role", "userId", "firstName", "lastName", "identifier"].forEach(k => localStorage.removeItem(k));
    } catch (e) {}
    router.push("/auth/login");
  };

  const active = pharmacies.filter((p) => p.active).length;
  const inactive = pharmacies.length - active;

  const filtered = pharmacies.filter((p) => {
    const q = p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase());
    const t = tab === "all" || (tab === "active" && p.active) || (tab === "inactive" && !p.active);
    return q && t;
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header sombre (fidèle maquette "Espace administrateur") */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-6 pt-14 pb-10 relative overflow-hidden">
        <div className="absolute top-[-40px] right-[-40px] w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-[-20px] w-32 h-32 rounded-full bg-[#0EA5E9]/10" />

        <Link href="/" className="flex items-center gap-2 text-[#64748B] text-sm mb-6 w-fit hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </Link>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#0EA5E9]/20 border border-[#38BDF8]/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          </div>
          <div>
            <p className="text-[#64748B] text-xs font-semibold uppercase tracking-wider">Super Administrateur</p>
            <h1 className="text-white text-2xl font-black mt-0.5">Administration</h1>
          </div>
          <div className="ml-auto">
            <button onClick={handleLogout} className="py-2 px-3 rounded-2xl text-sm font-black text-[#EF4444] bg-white/5 hover:bg-white/10 transition">
              Se déconnecter
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 mt-6 relative z-10">
          {[
            { label: "Total", value: pharmacies.length, color: "text-[#38BDF8]", bg: "bg-[#0EA5E9]/10 border-[#38BDF8]/20" },
            { label: "Actives", value: active, color: "text-[#22C55E]", bg: "bg-[#22C55E]/10 border-[#22C55E]/20" },
            { label: "Suspendues", value: inactive, color: "text-[#EF4444]", bg: "bg-[#EF4444]/10 border-[#EF4444]/20" },
          ].map((k) => (
            <div key={k.label} className={`${k.bg} border rounded-2xl p-3 text-center`}>
              <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
              <p className="text-[#64748B] text-[10px] font-semibold mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5 pb-10 flex flex-col gap-5">
        {/* Recherche */}
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une officine..."
            className="w-full bg-white border-2 border-[#E2E8F0] rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#38BDF8] shadow-sm transition placeholder:text-[#94A3B8]" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#F1F5F9] p-1 rounded-2xl">
          {[{ k: "all", l: `Toutes (${pharmacies.length})` }, { k: "active", l: `Actives (${active})` }, { k: "inactive", l: `Susp. (${inactive})` }].map((t) => (
            <button key={t.k} onClick={() => setTab(t.k as typeof tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${tab === t.k ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"}`}
            >{t.l}</button>
          ))}
        </div>

        {/* Bouton ajouter */}
        <button onClick={() => setShowAdd(!showAdd)}
          className="flex items-center justify-center gap-2 w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold py-4 rounded-2xl shadow-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          {showAdd ? "Annuler" : "Ajouter une pharmacie"}
        </button>

        {/* Formulaire ajout */}
        {showAdd && (
          <form onSubmit={(e) => { e.preventDefault(); setPharmacies((p) => [...p, { id: String(Date.now()), name: form.name, city: form.city, phone: form.phone, active: true }]); setForm({ name: "", city: "", phone: "" }); setShowAdd(false); }}
            className="bg-white rounded-3xl p-5 shadow-md border-2 border-[#BAE6FD] flex flex-col gap-4"
          >
            <h3 className="font-black text-[#0F172A] text-base">Nouvelle pharmacie</h3>
            {[{ label: "Nom", key: "name", ph: "Pharmacie Centrale" }, { label: "Ville", key: "city", ph: "Yaoundé" }, { label: "Téléphone", key: "phone", ph: "699 000 000" }].map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#0F172A]">{f.label}</label>
                <input required value={form[f.key as keyof typeof form]} onChange={(e) => setForm({...form, [f.key]: e.target.value})} placeholder={f.ph}
                  className="w-full border-2 border-[#E2E8F0] rounded-2xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#38BDF8] transition placeholder:text-[#94A3B8]" />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-3.5 rounded-2xl border-2 border-[#E2E8F0] text-[#64748B] font-bold text-sm">Annuler</button>
              <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-[#22C55E] text-white font-bold text-sm shadow-md hover:bg-[#16A34A] transition">Créer ✓</button>
            </div>
          </form>
        )}

        {/* Liste */}
        <div className="flex flex-col gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl p-4 shadow-md border border-[#F1F5F9]">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl ${p.active ? "bg-[#DCFCE7]" : "bg-[#FEE2E2]"}`}>
                  🏥
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-[#0F172A] text-sm">{p.name}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{p.city}</p>
                  <p className="text-[#94A3B8] text-xs">{p.phone}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${p.active ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#DC2626]"}`}>
                  {p.active ? "✓ Active" : "✗ Susp."}
                </span>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-[#F1F5F9]">
                <button onClick={() => setPharmacies((prev) => prev.map((ph) => ph.id === p.id ? { ...ph, active: !ph.active } : ph))}
                  className={`flex-1 py-3 rounded-2xl text-xs font-bold transition ${p.active ? "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]" : "bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]"}`}>
                  {p.active ? "⏸ Suspendre" : "▶ Réactiver"}
                </button>
                <button onClick={() => setEditTarget({ ...p })} className="flex-1 py-3 rounded-2xl text-xs font-bold bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD] hover:bg-[#BAE6FD] transition">
                  ✏️ Modifier
                </button>
                <button onClick={() => setDeleteTarget(p.id)} className="w-12 h-10 rounded-2xl bg-[#FEE2E2] text-[#EF4444] border border-red-200 flex items-center justify-center hover:bg-red-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#F1F5F9] flex items-center justify-center text-4xl">🔍</div>
              <p className="font-bold text-[#64748B]">Aucune pharmacie trouvée</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal modification */}
      {editTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 flex flex-col gap-4">
            <div className="w-12 h-1 bg-[#E2E8F0] rounded-full mx-auto" />
            <h3 className="font-black text-[#0F172A] text-lg">Modifier la pharmacie</h3>
            {[{ label: "Nom", key: "name" }, { label: "Ville", key: "city" }, { label: "Téléphone", key: "phone" }].map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#64748B]">{f.label}</label>
                <input value={editTarget[f.key as keyof Pharmacy] as string} onChange={(e) => setEditTarget({...editTarget, [f.key]: e.target.value})}
                  className="border-2 border-[#E2E8F0] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#38BDF8] bg-[#F8FAFC] transition" />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditTarget(null)} className="flex-1 py-4 rounded-2xl border-2 border-[#E2E8F0] text-[#64748B] font-bold">Annuler</button>
              <button onClick={() => { setPharmacies((p) => p.map((ph) => ph.id === editTarget.id ? editTarget : ph)); setEditTarget(null); }}
                className="flex-1 py-4 rounded-2xl bg-[#0EA5E9] text-white font-bold shadow-lg hover:bg-[#0284C7] transition">
                Sauvegarder ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal suppression */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 flex flex-col gap-5">
            <div className="w-12 h-1 bg-[#E2E8F0] rounded-full mx-auto" />
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#FEE2E2] flex items-center justify-center text-3xl">🗑️</div>
              <div>
                <h3 className="font-black text-[#0F172A] text-lg">Confirmer la suppression ?</h3>
                <p className="text-[#64748B] text-sm mt-1">La pharmacie sera retirée définitivement du réseau.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-4 rounded-2xl border-2 border-[#E2E8F0] text-[#64748B] font-bold">Annuler</button>
              <button onClick={() => { setPharmacies((p) => p.filter((ph) => ph.id !== deleteTarget)); setDeleteTarget(null); }}
                className="flex-1 py-4 rounded-2xl bg-[#EF4444] text-white font-bold shadow-lg hover:bg-red-600 transition">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
