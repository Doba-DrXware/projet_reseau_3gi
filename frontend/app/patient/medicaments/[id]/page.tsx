"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_MEDICATIONS } from "@/lib/mock-data";

export default function MedDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const med = MOCK_MEDICATIONS.find((m) => m.id === id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!med) return <main className="min-h-screen flex items-center justify-center"><p className="text-[#64748B]">Médicament introuvable.</p></main>;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0284C7] to-[#38BDF8] px-6 pt-14 pb-16 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-52 h-52 rounded-full bg-white/10" />
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sky-100 text-sm mb-6 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Retour
        </button>
        <div className="flex justify-center relative z-10">
          <div className="w-28 h-28 rounded-3xl bg-white/20 border-2 border-white/30 flex items-center justify-center shadow-xl text-6xl">💊</div>
        </div>
      </div>

      <div className="px-5 -mt-6 pb-32 flex flex-col gap-4 relative z-10">
        {/* Infos principales */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="font-black text-[#0F172A] text-lg leading-tight">{med.name}</h1>
              <p className="text-[#64748B] text-sm mt-1">{med.form}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ml-2 ${med.inStock ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#DC2626]"}`}>
              {med.inStock ? "✓ En stock" : "✗ Épuisé"}
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex justify-between items-center">
            <div>
              <p className="text-[#94A3B8] text-xs">Prix unitaire</p>
              <p className="font-black text-[#0EA5E9] text-2xl mt-0.5">{med.price.toLocaleString()} <span className="text-sm">FCFA</span></p>
            </div>
            <span className="bg-[#E0F2FE] text-[#0284C7] text-xs font-semibold px-3 py-1.5 rounded-full">{med.category}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <h2 className="font-black text-[#0F172A] text-sm mb-2">Description</h2>
          <p className="text-[#64748B] text-sm leading-relaxed">{med.description}</p>
        </div>

        {/* Officine */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
          <h2 className="font-black text-[#0F172A] text-sm mb-3">Disponible chez</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#0F172A] text-sm">{med.pharmacy}</p>
              <p className="text-[#64748B] text-xs mt-0.5">{med.address}</p>
              <p className="text-[#94A3B8] text-xs">{med.hours} • {med.distance}</p>
            </div>
          </div>
        </div>

        {/* Quantité */}
        {med.inStock && (
          <div className="bg-white rounded-3xl p-5 shadow-md border border-[#F1F5F9]">
            <h2 className="font-black text-[#0F172A] text-sm mb-3">Quantité</h2>
            <div className="flex items-center gap-4">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 rounded-2xl bg-[#F1F5F9] flex items-center justify-center text-xl font-bold text-[#64748B] hover:bg-[#E2E8F0] transition">−</button>
              <span className="text-2xl font-black text-[#0F172A] flex-1 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-12 h-12 rounded-2xl bg-[#0EA5E9] flex items-center justify-center text-xl font-bold text-white hover:bg-[#0284C7] transition">+</button>
            </div>
            <div className="mt-3 p-3 bg-[#E0F2FE] rounded-2xl flex justify-between items-center">
              <span className="text-[#0284C7] text-sm font-semibold">Total</span>
              <span className="text-[#0284C7] font-black text-lg">{(med.price * qty).toLocaleString()} FCFA</span>
            </div>
          </div>
        )}
      </div>

      {/* Actions fixes */}
      {med.inStock && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-5 py-4 flex gap-3 shadow-[0_-4px_20px_rgba(14,165,233,0.1)]">
          <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
            className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all ${added ? "bg-[#22C55E] text-white" : "bg-[#E0F2FE] text-[#0284C7] border-2 border-[#BAE6FD]"}`}
          >{added ? "✓ Ajouté !" : "Ajouter au panier"}</button>
          <button className="flex-1 py-4 rounded-2xl font-bold text-sm bg-[#0EA5E9] text-white hover:bg-[#0284C7] transition shadow-lg">
            Réserver maintenant
          </button>
        </div>
      )}
    </main>
  );
}
