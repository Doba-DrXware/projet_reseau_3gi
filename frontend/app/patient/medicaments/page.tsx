"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_MEDICATIONS } from "@/lib/mock-data";

/* Inspiré maquette "Recherche médicaments" Figma */

export default function MedicamentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "price" | "distance">("all");

  const filtered = MOCK_MEDICATIONS
    .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => filter === "price" ? a.price - b.price : filter === "distance" ? parseFloat(a.distance) - parseFloat(b.distance) : 0);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0284C7] to-[#38BDF8] px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full bg-white/10" />
        <Link href="/patient" className="flex items-center gap-2 text-sky-100 text-sm mb-5 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </Link>
        <h1 className="text-white text-2xl font-black relative z-10">Médicaments</h1>
        <p className="text-sky-100 text-sm mt-1 relative z-10">Trouvez et comparez en temps réel</p>
        {/* Recherche */}
        <div className="mt-4 relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Paracétamol, Antibiotique..."
            className="w-full bg-white rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none shadow-lg placeholder:text-[#94A3B8]" />
        </div>
      </div>

      <div className="px-5 pt-5 pb-24 flex flex-col gap-5">
        {/* Filtres */}
        <div className="flex gap-2">
          {[{ k: "all", l: "Tous" }, { k: "price", l: "💰 Moins cher" }, { k: "distance", l: "📍 Plus proche" }].map((f) => (
            <button key={f.k} onClick={() => setFilter(f.k as typeof filter)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === f.k ? "bg-[#0EA5E9] text-white shadow-md" : "bg-white text-[#64748B] border border-[#E2E8F0]"}`}
            >{f.l}</button>
          ))}
        </div>

        <p className="text-[#64748B] text-xs font-medium">{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</p>

        <div className="flex flex-col gap-3">
          {filtered.map((m) => (
            <Link key={m.id} href={`/patient/medicaments/${m.id}`}
              className="bg-white rounded-3xl p-4 shadow-md border border-[#F1F5F9] active:scale-98 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl ${m.inStock ? "bg-[#E0F2FE]" : "bg-[#F1F5F9]"}`}>💊</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0F172A] text-sm leading-tight">{m.name}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{m.form}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    <span className="text-[#94A3B8] text-xs truncate">{m.pharmacy} • {m.distance}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-black text-[#0EA5E9] text-base">{m.price.toLocaleString()} <span className="text-xs">F</span></span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${m.inStock ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#DC2626]"}`}>
                    {m.inStock ? "En stock" : "Épuisé"}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex justify-between items-center">
                <span className="bg-[#E0F2FE] text-[#0284C7] text-[10px] font-semibold px-2 py-0.5 rounded-full">{m.category}</span>
                <span className="text-[#0EA5E9] text-xs font-semibold flex items-center gap-1">
                  Voir détails <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#F1F5F9] flex items-center justify-center text-4xl">🔍</div>
            <p className="font-bold text-[#64748B]">Aucun résultat</p>
            <p className="text-[#94A3B8] text-sm">Essayez un autre terme</p>
          </div>
        )}
      </div>
    </main>
  );
}
